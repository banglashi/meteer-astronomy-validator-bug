Posts = new Mongo.Collection('posts')
Post = Astronomy.Class({
  name: 'Post',
  collection: Posts,
  fields:{
    title: {
      type: 'string'
    }
  }
});


if (Meteor.isClient) {

  Post.addValidator('title', Validators.or([
    Validators.null(),
    Validators.and([
      Validators.string(),
      Validators.minLength(5),
      Validators.maxLength(15)
    ])
  ]));

  Template.newPost.onCreated(function(){
    this.post = new Post();
  });
  Template.newPost.events({
    'click .js-save': function(e,t){
      e.preventDefault();
      t.post.title = t.find('.js-title').value;
      t.post.validate();
    }
  });
  Template.newPost.helpers({
    post: function(){
      return Template.instance().post;
    }
  });

}