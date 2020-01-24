import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NProgress from 'nprogress'
import store from '@/store/store'
import NotFound from './views/NotFound.vue'
import NetworkIssue from './views/NetworkIssue.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true // We'll set the page parameter, so we want to send it in as a prop
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true, // Set params to props
      beforeEnter(routeTo, routeFrom, next) {
        // before this route is loader
        store
          .dispatch('event/fetchEvent', routeTo.params.id)
          .then(event => {
            routeTo.params.event = event // <-- Set the event we retrieved
            next()
          })
          .catch(error => {
            if (error.response && error.response.status == 404) {
              next({
                name: '404',
                params: {
                  resource: 'event'
                }
              })
            } else {
              next({
                name: 'network-issue'
              })
            }
          })
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true // I added this so we can receive the params as a prop
    },
    {
      // Here's the new catch all route
      path: '*',
      redirect: {
        name: '404',
        params: {
          resource: 'page'
        }
      }
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue
    }
  ]
})

router.beforeEach((routeTo, routeFrom, next) => {
  // Start the route progress bar
  NProgress.start()
  NProgress.set(0.4)
  next()
})
router.afterEach(() => {
  // Complete the animation of the route progress bar
  NProgress.done()
})

export default router