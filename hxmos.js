"use strict";

const HxmosId = {
  Visible: 'hxmos-visible',
}

const HxmosClass = {
  /**
   * ユーザーが切り替えボタンを押すことで付与・削除されるクラス。
   * このクラスの有無を切り替えることで、各 `HxmosClass.Blurable` クラス要素のブルー状態が切り替わる。
   */
  BlurContainer: 'hxmos-blur-container',
  /**
   * この拡張機能でブルー状態をコントロールする要素に付与するクラス。
   */
  Blurable: 'hxmos-blurable',

  /**
   * 表示状態を切り替えるためのボタン (切り替えボタン) に付与するクラス。
   */
  ToggleButton: 'hxmos-toggle-button',

  Switcher: 'hxmos-switcher',

  /**
   * 切り替えボタンのコンテナに付与するクラス。
   */
  ToggleButtonContainer: 'hxmos-toggle-button-container',
}

const HxmosElement = {
  ToggleButtonContainer: () => document.getElementsByClassName(HxmosClass.ToggleButtonContainer)[0],
  BlurContainer: () => document.getElementsByClassName(HxmosClass.BlurContainer)[0],
  BlurCheckbox: () => document.getElementById(HxmosId.Visible),
}

const AppElementName = {
  TabGroup: 'mat-tab-group',
  HeaderHelpMenu: 'app-header-help-menu',
  Header: 'hrm-header',
}

const AppClass = {
  TabLabels: 'mat-tab-labels',
  ExpansionPanelContent: 'mat-expansion-panel-content',
}

const AppElement = {
  TabGroup: () => document.querySelector(AppElementName.TabGroup),
  TabLabels: () => document.getElementsByClassName(AppClass.TabLabels)[0],
  Header: () => document.querySelector(AppElementName.Header),
}

const HxmosStore = () => {
  const getInitialStatus = () => ({
    blur: true,
  })

  const getCurrentStatus = () => {
    const blur = HxmosElement.BlurCheckbox()?.checked ?? false
    return {
      blur,
    }
  }

  return {
    getCurrentStatus,
    getInitialStatus,
  }
}

const HxmosStatusRenderer = () => {
  const render = (hxmosStatus) => {
    const appTabGroup = AppElement.TabGroup()
    if (hxmosStatus.blur) {
      appTabGroup?.classList?.add(HxmosClass.BlurContainer)
    } else {
      appTabGroup?.classList?.remove(HxmosClass.BlurContainer)
    }
  }
  return {
    render,
  }
}

const HxmosToggleButtonRenderer = () => {
  const render = (onToggleButtonClick) => {
    const createToggleButtonContainer = () => {
      const btnContainer = document.createElement('div')
      btnContainer.classList.add(HxmosClass.ToggleButtonContainer)
      btnContainer.innerHTML = `
      <label class='${HxmosClass.ToggleButton}' for='${HxmosId.Visible}'>
        <input type='checkbox' id='${HxmosId.Visible}' checked='checked'>
        <span class='hxmos-toggle-button-caption-on'>HXMOSオン</span>
        <span class='hxmos-toggle-button-caption-off'>HXMOSオフ</span>
        <span class='${HxmosClass.Switcher}'></span>
      </label>`
      btnContainer.querySelector('label').onchange = onToggleButtonClick
      return btnContainer
    }
    const header = AppElement.Header()
    if (!header) {
      return
    }
    const headerHelpMenu = header.querySelector(AppElementName.HeaderHelpMenu)
    if (!headerHelpMenu || headerHelpMenu.getElementsByClassName(HxmosClass.ToggleButtonContainer).length > 0) {
      return
    }
    const container = createToggleButtonContainer()
    header.querySelector(AppElementName.HeaderHelpMenu).appendChild(container)
  }

  return {
    render,
  }
}

const HxmosBlurableElementsRenderer = () => {
  const render = () => {
    const elemsToBeBlurable =
      [].concat(
        ...Array
          .from(document.querySelectorAll(`${AppElementName.TabGroup} .timeline-events-item-title`))
          .filter(elem => elem.innerText.includes('評価')))
        .concat(...Array
          .from(document.querySelectorAll(`${AppElementName.TabGroup} .evaluation-summary`))
          .filter(elem => elem.innerHTML.includes('総合評価')))
        .concat(...Array
          .from(document.querySelectorAll(`${AppElementName.TabGroup} .screening-event-content-detail-table td`))
          .filter(elem => elem.innerText.includes('総合評価')))
        .concat(...Array
          .from(document.querySelectorAll(`${AppElementName.TabGroup} .screening-events-item-header-interviewers`)))
        .filter(elem => !(elem.classList?.contains(HxmosClass.Blurable)))
  
    elemsToBeBlurable
      .forEach(elem => {
        elem.classList?.add(HxmosClass.Blurable)
      })
  }
  return {
    render,
  }
}

const HxmosRenderer = () => {
  const blurableElementsRenderer = HxmosBlurableElementsRenderer()
  const toggleButtonRenderer = HxmosToggleButtonRenderer()
  const statusRenderer = HxmosStatusRenderer()

  const render = (hxmosStatus, onToggleButtonClick) => {
    blurableElementsRenderer.render()
    toggleButtonRenderer.render(onToggleButtonClick)
    statusRenderer.render(hxmosStatus)
  }

  return {
    render,
  }
}

const HxmosInitializedChecker = () => {
  const isInitialized = () => {
    const header = AppElement.Header()
    const toggleButtonContainerExists = HxmosElement.ToggleButtonContainer() != null
    const headerExists = header != null
    return toggleButtonContainerExists || !headerExists
  }
  
  const canInitialize = () => {
    return AppElement.TabGroup() != null
  }

  return {
    isInitialized,
    canInitialize,
  }
}

const Hxmos = () => {
  const hxmosInitializedChecker = HxmosInitializedChecker()
  const hxmosStore = HxmosStore()
  const hxmosRenderer = HxmosRenderer()
  const update = () => {
    const hxmosState = hxmosInitializedChecker.isInitialized() ? hxmosStore.getCurrentStatus() : hxmosStore.getInitialStatus()
    hxmosRenderer.render(hxmosState, onToggleButtonClick)
  }

  const onToggleButtonClick = () => {
    update()
  }

  return {
    update,
  }
}

const hxmosRenderer = HxmosRenderer()
const observer = new MutationObserver((muts) => {
  const hxmos = Hxmos()
  const renderNeeded = muts.some((mut) => {
    const eventsUpdated =
      mut.type === 'childList' &&
      Array
        .from(mut.addedNodes)
        .some(node => node?.classList?.contains('timeline-events') || node?.classList?.contains('screening-events'))
    const panelExpanded =
        mut.type === 'attributes' &&
        mut.target?.classList?.contains(AppClass.ExpansionPanelContent)
    const paneChanged = mut.target.nodeName.toLowerCase() === 'hrm-pane'
    return eventsUpdated || panelExpanded || paneChanged
  })
  if (renderNeeded) {
    hxmos.update()
  }
})

observer.observe(document.body, {
  attributes: true,
  attributeOldValue: true,
  childList: true,
  characterData: false,
  subtree: true
})