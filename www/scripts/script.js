$(document).ready(function(){

  let isOpen = false;

  $('.j-burger').on('click', function(){
    // if (isOpen) {
    //   $('.j-menu').slideUp();
    //   isOpen = false;
    // } else {
    //   $('.j-menu').slideDown();
    //   isOpen = true;
    // }

    $('.j-menu').slideToggle();
  });


  // Табы на странице контактов
  $('.j-tabs-link').on('click', function(e) {
    e.preventDefault();

    const index = $(this).index('.j-tabs-link');

    $('.j-tabs-link').removeClass('active');
    $(this).addClass('active');

    $('.j-tabs-content').removeClass('active');
    $('.j-tabs-content').eq(index).addClass('active');

  });



  // Фильтры
  $('.j-filter-link').on('click', function(e) {
    e.preventDefault();

    const filter = $(this).data('filter');

    $('.j-filter-link').removeClass('active');
    $(this).addClass('active');

    if (filter === 'all') {
      $('.j-cases-item').show();
      return;
    }

    $('.j-cases-item').each(function() {
      const type = $(this).data('type');

      if (type === filter) {
        $(this).show();
        return;
      }

      $(this).hide();
    });
  });


  // Аккордионы
  let prevBtn;

  $('.j-accordion-btn').on('click', function(){
    if (prevBtn === this) {
      $(this).next().slideToggle();
      return;
    }

    $('.j-accordion-btn').next().slideUp();
    $(this).next().slideToggle();
    prevBtn = this;
  });



  // Slider
  if ( $('.j-slider').length ) {
    $('.j-slider').slick({
      dots: true,
      autoplay: true,
    });
  }

  // Ajax подгрузка отзывов
  $('.j-review-btn').on('click', function() {
    $.ajax({
      type: 'POST',
      url: 'jsons/reviews.json',
      data: 'reviewCount=2',
      success: function(response) {
        let htmlString = createHtml(response.reviews);
        printToPage(htmlString)
      }
    });
  });
  

  function createHtml(reviewsArray) {
    let reviewHtml = '';

    reviewsArray.forEach(function(review){
      console.log(review.name);

      reviewHtml = reviewHtml + `<div class="reviews-item">
      <div class="review">
        <div class="review-photo-wrap">
          <img src="${review.photoUrl}" alt="" class="review-photo">
        </div>
        <div class="review-content">
          <strong class="review-name">${review.name}</strong>
          <blockquote class="review-quote">“${review.text}”</blockquote>
        </div>
      </div>
    </div>`;
    });

    return reviewHtml;
  }

  function printToPage(string) {
    $('.j-reviews-list').append(string);
  }


});
