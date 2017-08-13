import {$, Bb, Mn, I18N, showTitle} from '../common'

import template from './panorama-view.html'

const PanoramaView = Mn.View.extend({
  className: 'panorama',
  tagName() {
    return this.model.attributes.viewType === 'thumbnail' ? 'li' : 'tr'
  },
  template
})

export default Mn.CollectionView.extend({
  className: 'panoramas',
  tagName() {
    return this.options.viewType === 'thumbnail' ? 'ul' : 'tbody'
  },
  childView: PanoramaView,
  childViewOptions(model) {
    model.set({viewType: this.options.viewType})
  },
  events: {
    'mousemove .J-enlarge'(e) {
      showTitle(e, I18N.panoramaPreview)
    },
    'mouseout .J-enlarge'() {
      $('.alert-title').hide()
    },
    'mousemove .J-image-title'(e) {
      const arr = this.options.panorama
      const id = $(e.currentTarget).attr('data-index')
      let size = ''
      let date = ''
      arr.map(el => {
        $.each(el, (key, value) => {
          if (key === 'mediumId' && value === id) {
            size = el.mediumSize
            date = el.updateTime
          }
        })
      })
      showTitle(
        e,
        `
       <ul>
           <li>${I18N.size}: ${size}</li>
           <li>${I18N.updatedDate}: ${date}</li>
       </ul>
      `
      )
    },
    'mouseout .J-image-title'() {
      $('.alert-title').hide()
    }
  },
  initialize({panorama}) {
    this.collection = new Bb.Collection(panorama)
  }
})