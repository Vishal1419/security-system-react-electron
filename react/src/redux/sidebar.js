export const types = {
  SET_ACTIVE_MENU_ITEM_KEY: 'active-menuItem::key::set',
  TOGGLE_EXPANDED_MENU_ITEM_KEY: 'expanded-menuItem-keys::toggle',
  SET_SELECTED_EXPANDED_MENU_ITEM_KEY: 'selected-expanded-menuItem::key::set',
  FLUSH_SELECTED_EXPANDED_MENU_ITEM_KEY: 'selected-expanded-menuItem::key::flush',
};

const INITIAL_STATE = {
  activeMenuItemKey: 'users',
  expandedMenuItemKeys: [],
  selectedExpandedMenuItemKey: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_MENU_ITEM_KEY:
      return {
        ...state,
        activeMenuItemKey: action.payload,
      };
    case types.TOGGLE_EXPANDED_MENU_ITEM_KEY:
      return {
        ...state,
        expandedMenuItemKeys: state.expandedMenuItemKeys.includes(action.payload)
          ? state.expandedMenuItemKeys.filter(menuItemKey => menuItemKey !== action.payload)
          : [
          ...state.expandedMenuItemKeys,
          action.payload,
        ],
      };
    case types.SET_SELECTED_EXPANDED_MENU_ITEM_KEY: {
      const expandedMenuItemKeys = state.expandedMenuItemKeys.filter(menuItemKey => menuItemKey !== state.selectedExpandedMenuItemKey);
      return {
        ...state,
        selectedExpandedMenuItemKey: action.payload,
        expandedMenuItemKeys: [
          ...expandedMenuItemKeys,
          action.payload,
        ],
      }
    }
    case types.FLUSH_SELECTED_EXPANDED_MENU_ITEM_KEY:
      return {
        ...state,
        expandedMenuItemKeys: state.expandedMenuItemKeys.filter(menuItemKey => menuItemKey !== state.selectedExpandedMenuItemKey),
        selectedExpandedMenuItemKey: '',
      }
    default:
      return state;
  }
};

export const actions = {
  setActiveMenuItemKey: menuItemKey => ({
    type: types.SET_ACTIVE_MENU_ITEM_KEY,
    payload: menuItemKey,
  }),
  toggleExpandedMenuItemKey: menuItemKey => ({
    type: types.TOGGLE_EXPANDED_MENU_ITEM_KEY,
    payload: menuItemKey,
  }),
  setSelectedExpandedMenuItemKey: menuItemKey => ({
    type: types.SET_SELECTED_EXPANDED_MENU_ITEM_KEY,
    payload: menuItemKey,
  }),
  flushSelectedExpandedMenuItemKey: () => ({
    type: types.FLUSH_SELECTED_EXPANDED_MENU_ITEM_KEY,
  })
};
