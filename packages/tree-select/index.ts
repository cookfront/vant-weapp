import { VantComponent } from '../common/component';

const ITEM_HEIGHT = 44;

VantComponent({
  props: {
    items: Array,
    mainActiveIndex: {
      type: Number,
      value: 0
    },
    activeId: {
      type: Number,
      value: 0
    },
    maxHeight: {
      type: Number,
      value: 300
    }
  },

  data: {
    subItems: [],
    mainHeight: 0,
    itemHeight: 0
  },

  watch: {
    items() {
      this.updateSubItems();
      this.updateMainHeight();
    },

    maxHeight() {
      this.updateItemHeight();
      this.updateMainHeight();
    },

    mainActiveIndex: 'updateSubItems'
  },

  methods: {
    // 当一个子项被选择时
    onSelectItem(event: Weapp.Event) {
      const { item } = event.currentTarget.dataset;
      if (!item.disabled) {
        this.$emit('click-item', item);
      }
    },

    // 当一个导航被点击时
    onClickNav(event: Weapp.Event) {
      const { index } = event.currentTarget.dataset;
      this.$emit('click-nav', { index });
    },

    // 更新子项列表
    updateSubItems() {
      const selectedItem = this.data.items[this.data.mainActiveIndex] || {};

      this.setData({ subItems: selectedItem.children || [] });

      this.updateItemHeight();
    },

    // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
    updateMainHeight() {
      const maxHeight = Math.max(
        this.data.items.length * ITEM_HEIGHT,
        this.data.subItems.length * ITEM_HEIGHT
      );

      this.setData({ mainHeight: Math.min(maxHeight, this.data.maxHeight) });
    },

    // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
    updateItemHeight() {
      this.setData({
        itemHeight: Math.min(
          this.data.subItems.length * ITEM_HEIGHT,
          this.data.maxHeight
        )
      });
    }
  }
});
