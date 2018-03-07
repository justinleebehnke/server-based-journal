var app = new Vue({
  el: '#app',
  data: {
    items: [],
    text: '',
    show: 'all',
    drag: {},
  },
  computed: {
    activeItems: function() {
      return this.items.filter(function(item) {
	return !item.completed;
      });
    },
    filteredItems: function() {
      if (this.show === 'active')
	return this.items.filter(function(item) {
	  return !item.completed;
	});
      if (this.show === 'completed')
	return this.items.filter(function(item) {
	  return item.completed;
	});
      return this.items;
    },
  },
  methods: {
    addItem: function() {
      this.todos.push({text: this.message,completed:false});
      this.message = '';
    },
    completeItem: function(item) {
      item.completed = !item.completed;
    },
    deleteItem: function(item) {
      var index = this.todos.indexOf(item);
      if (index > -1)
	this.todos.splice(index,1);
    },
    showAll: function() {
      this.show = 'all';
    },
    showActive: function() {
      this.show = 'active';
    },
    showCompleted: function() {
      this.show = 'completed';
    },
    deleteCompleted: function() {
      this.todos = this.todos.filter(function(item) {
	return !item.completed;
      });
    },
    dragItem: function(item) {
      this.drag = item;
    },
    dropItem: function(item) {
      var indexItem = this.todos.indexOf(this.drag);
      var indexTarget = this.todos.indexOf(item);
      this.todos.splice(indexItem,1);
      this.todos.splice(indexTarget,0,this.drag);
    },
  }
});
