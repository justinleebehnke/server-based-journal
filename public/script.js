var app = new Vue({
  el: '#app',
  data: {
    items: [],
    selected: 'Medium',
    text: '',
    show: 'all',
    drag: {},
  },
  created: function() {
  this.getItems();
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
      axios.post("/api/items", {
      	text: this.text,
        selected: this.selected,
      	completed: false
      }).then(response => {
      	this.text = "";
        this.selected = 'Medium';
      	this.getItems();
      	return true;
        }).catch(err => {
        });
    },
    getItems: function() {
      axios.get("/api/items", {
        sort: false,
      }).then(response => {
        this.items = response.data;
        return true;
      }).catch(err => {
      });
    },
    completeItem: function(item) {
      axios.put("/api/items/" + item.id, {
        text: item.text,
        completed: !item.completed,
        orderChange: false,
      }).then(response => {
        return true;
      }).catch(err => {
      });
    },
    deleteItem: function(item) {
      axios.delete("/api/items/" + item.id).then(response => {
      	this.getItems();
      	return true;
      }).catch(err => {
      });
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
      this.items.forEach(item => {
      	if (item.completed)
      	  this.deleteItem(item)
      });
    },
    sortItems: function() {
      axios.get("/api/items/", {sort: true}).then(response => {
        this.getItems();
        return true;
      }).catch(err => {
      });
    },
    dragItem: function(item) {
      this.drag = item;
    },
    dropItem: function(item) {
      axios.put("/api/items/" + this.drag.id, {
      	text: this.drag.text,
      	completed: this.drag.completed,
        selected: this.drag.selected,
      	orderChange: true,
      	orderTarget: item.id
        }).then(response => {
        	this.getItems();
        	return true;
        }).catch(err => {
        });
    },
  }
});
