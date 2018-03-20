var app = new Vue({
   el: '#app',
  data: {
    addedUser: '',
    addedTeam: '',
    addedDate: '',
    addedMiles: '',
    addedGoal: '',
    addedDuration: '',
    addedWeather: '',
    addedComment: '',
    posts: [],
  },
  computed: {
    created: function() {
      this.getPosts();
    },
  },
  methods: {
    getPosts: function() {
      axios.get("/api/posts").then(response => {
        this.posts = response.data;
        return true;
      }).catch(err => {
      });
    },
    addPost: function() {
      axios.post("/api/posts", {
        user:this.addedUser,
        team:this.addedTeam,
        date:this.addedDate,
        miles:this.addedMiles,
        goal:this.addedGoal,
        time:this.addedDuration,
        weather:this.addedWeather,
        text:this.addedComment,
      }).then(response => {
        this.addedUser = '';
        this.addedTeam = '';
        this.addedDate = '';
        this.addedMiles = '';
        this.addedGoal = '';
        this.addedDuration = '';
        this.addedWeather = '';
        this.addedComment = '';
        this.getPosts();
        return true;
      }).catch(err => {
      });
    },
    deletePost: function(post) {
      axios.delete("/api/posts/" + post.id).then(response => {
        this.getPosts();
        return true;
      }).catch(err => {
      });
    },
  }
});
