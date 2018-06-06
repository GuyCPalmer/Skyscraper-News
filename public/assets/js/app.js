$(document).ready(function() {
    $("div#addComment.ui.button").click(function() {
      $("#comment").modal("show");
    });
  });
  
  $(document).ready(function() {
    $("div#viewComments.ui.button").click(function() {
      $("#view").modal("show");
    });
  });
  
  function hideModal() {
    $(".ui.modal").modal("hide");
  }
  
  $(document).on("click", "#save", hideModal);
  
  // Click Listener for FORM SUBMISSION to ADD a comment
    $('#save').on('click', function(){
     
      // Get _id of comment to be deleted
      var articleId = $(this).data("id");
  
      // URL root (so it works in eith Local Host for Heroku)
      var baseURL = window.location.origin;
  
      // Get Form Data by Id
      var formName = "form-add-" + articleId;
      var form = $('#' + formName);
  
  
      // AJAX Call to delete Comment
      $.ajax({
        url: baseURL + '/add/comment/' + articleId,
        type: 'POST'
      })
      .done(function() {
        // Refresh the Window after the call is done
        location.reload();
      });
      
      // Prevent Default
      return false;
  
    });
  
  
    // Click Listener for FORM SUBMISSION to DELETE a comment
    $('.delete-comment-button').on('click', function(){
  
      // Get _id of comment to be deleted
      var commentId = $(this).data("id");
  
      // URL root (so it works in eith Local Host for Heroku)
      var baseURL = window.location.origin;
  
      // AJAX Call to delete Comment
      $.ajax({
        url: baseURL + '/remove/comment/' + commentId,
        type: 'POST',
      })
      .done(function() {
        // Refresh the Window after the call is done
        location.reload();
      });
      
      // Prevent Default
      return false;
  
    });
  
  