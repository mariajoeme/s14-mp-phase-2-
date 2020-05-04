$(document).ready(function() {

  // POST called
  $('#addReview').click(function() {
    // Get the data from the form
    var newReview = {
      profRef: $('#revProfRef').text(),
      profName: $('#revProfName').find(":selected").text(),
      profNumber: $('#revProfNum').text(),
      profCourse: $('#revProfCourse').find(":selected").text(),
      studentRef: $('#revStudentRef').text(),
      studentId: $('#revStudentId').text(),
      reviewContent: $("textarea#revContent").val()
    };

    $.post('/addReview', newReview, function(data, status) {
      console.log(data);

      if (data.success) {
        $('#msg').addClass('text-success');
        $('#msg').removeClass('text-danger');
        $('#msg').text('Successfully added review!');
        $('#revProfRef').val('');
        $('#revProfNum').val('');
        $('#revStudentRef').val('');
        $('#revStudentId').val('');
        $('textarea#revContent').val('');
      } else {
        $('#msg').addClass('text-danger');
        $('#msg').removeClass('text-success');
        $('#msg').text('Error in adding review!');
      }

    });
  });

  $('#addComment').click(function() {
    // Get the data from the form
    var newComment = {
      reviewRef: $('#reviewRef').text(),
      studentRef: $('#studentRef').text(),
      commentContent: $("textarea#commentContent").val()
    };

    $.post('/addComment', newComment, function(data, status) {
      console.log(data);

      if (data.success) {
        $('#msg').addClass('text-success');
        $('#msg').removeClass('text-danger');
        $('#msg').text('Successfully posted comment!');
        $('#reviewRef').val('');
        $('#studentRef').val('');
        $('textarea#commentContent').val('');
      } else {
        $('#msg').addClass('text-danger');
        $('#msg').removeClass('text-success');
        $('#msg').text('Error in adding comment!');
      }

    });
  });
  
  $('#quickCollege').change(function() {
    var selectedCollege = $(this).children("option").filter(":selected").val();
    var course = document.getElementById('quickCourse');
    var prof = document.getElementById('quickProf');
    var courseItem = "<option hidden disabled selected value>Choose...</option>";
    prof.innerHTML = courseItem;
    $.get('/getCourseByCollege', selectedCollege, function(data, status) {
      $.each(data, function(index, value){
        courseItem += "<option>" + value + "</option>";
      });
      course.innerHTML = courseItem;
    });
});
  
$("#quickCourse").change(function() {
    var selectedCourse = $(this).children("option").filter(":selected").val();
    var prof = document.getElementById('quickProf');
    var profItem = "<option hidden disabled selected value>Choose...</option>";
  
    $.get('/getProfByCourse', selectedCourse, function(data, status) {
      $.each(data, function(index, value){
        profItem += "<option>" + value + "</option>";
      });
      prof.innerHTML = profItem;
    });
  });


function defaultAdminTable () {
  var totalRows = $('#myTable tbody tr').length;
  var pages = totalRows/10;
  var pageList = document.getElementById('paging');
  var item = "";
  
  $('#myTable tbody tr').hide().slice(0, 10).show()
  
 
  

  for (var i = 1; i <= pages; i++)
  {
    item += '<li class="page-item"><a class="page-link">'+ i +'</a></li>';
  }
  pageList.innerHTML = item;

  $('#paging li').on( "click", function() {
    var pageNum = $(this).text();
    var x = parseInt(pageNum);
    //console.log (pageNum);
    //console.log(x);

    var start = 10 * x;
    var end = start + 10;

    $('#myTable tbody tr').hide().slice(start, end).show();
  });
  
}

defaultAdminTable();

$("#noEntries").change(function() {
  var maxRows = $(this).children("option").filter(":selected").val();
  var totalRows = $('#myTable tbody tr').length;
  
  var pages = totalRows/maxRows;
  var pageList = document.getElementById('paging');
  var item = "";
  $('#myTable tbody tr').hide().slice(0, maxRows).show();

  //console.log(maxRows);
  
  for (var i = 1; i <= pages; i++)
  {
    item += '<li class="page-item"><a class="page-link">'+ i +'</a></li>';
  }

  pageList.innerHTML = item;

  $('#paging li').click(function() {
    var pageNum = $(this).text();
    var x = parseInt(pageNum);
    //console.log(x);
    var start = maxRows * x;
    var end = start + maxRows;

    $('#myTable tbody tr').hide().slice(start, end).show();
    }); 
    
  });

});
