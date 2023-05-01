const update = () => {
  const timelineItems = Array
    .from(document.querySelectorAll('.timeline-events-item-title'))
    .filter(elem => elem.innerText.includes('評価'))

  const evaluationSummaryItems = Array
    .from(document.querySelectorAll('.evaluation-summary'))
    .filter(elem => elem.innerText.includes('総合評価'))

  const screeningEventItems = Array
    .from(document.querySelectorAll('.screening-event-content-detail-table td'))
    .filter(elem => elem.innerText.includes('総合評価'))

  const elems = [...timelineItems, ...evaluationSummaryItems, ...screeningEventItems]
    .filter(elem => !(elem.classList?.contains('hxmos-blur')) && !(elem.classList?.contains('hxmos-show')))

  const createButton = (elem) => {
    const div = document.createElement('div')
    div.innerHTML = `<button class='hxmos-show-button'>表示する</button>`
    div.classList.add('hxmos-show-button-container')
    const btn = div.querySelector('button')
    btn.onclick = () => {
      elem.classList?.add('hxmos-show')
      elem.classList?.remove('hxmos-blur')
      btn.remove()
    }
    return div
  }

  elems
    .forEach(elem => {
      elem.parentNode.classList?.add('hxmos-parent');
      elem.classList?.add('hxmos-blur')
      elem.parentNode.append(createButton(elem))
    })
}

const observer = new MutationObserver((muts) => {
  const updated = muts.some((mut) => {
    if (mut.type !== 'childList') {
      return false
    }
    const nodes = Array.from(mut.addedNodes)
    return nodes.some(node => {
      if (node?.getAttribute == null) {
        return false
      }
      const nodeClassAttr = node.getAttribute('class')
      if (nodeClassAttr == null) {
        return false
      }
      return nodeClassAttr.includes('timeline-events') || nodeClassAttr.includes('screening-events')
    })
  })
  if (updated) {
    setTimeout(() => update(), 300)
  }
})

observer.observe(document.body, {
  attributes: true,
  attributeOldValue: true,
  childList: true,
  characterData: false,
  subtree: true
})