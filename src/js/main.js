
$(document).on("scroll",function()
{
    if($(document).scrollTop()>150)
    {
        $('.scroll-top').css({'bottom': '20px'})         
    } 
    else
    {
         $('.scroll-top').css({'bottom': '-50px'})         
    }
});

$('.scroll-top').click(function() {
	$('html, body').animate({scrollTop: '0px'}, 500);
})

var heightContent = $(document).height()-536;

$('.content-pages').css({'min-height': heightContent});