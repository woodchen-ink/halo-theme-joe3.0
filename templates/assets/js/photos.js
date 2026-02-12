$(document).ready(function(){
    const $grid = $('#image-grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-item'
        }
    });
    let page = Number(document.querySelector('#image-grid').getAttribute('data-index'))+1
    const totalPage = document.querySelector('#image-grid').getAttribute('data-total')

    const baseUrl = ThemeConfig.blog_url;
    const loadingIndicator = document.querySelector('.joe_loading');

function loadRealImages(){
    const gridItems = document.querySelectorAll('.grid-item');

    // debounce isotope layout，避免每张图都触发重排
    let layoutTimer = null;
    const debouncedLayout = function() {
        if (layoutTimer) clearTimeout(layoutTimer);
        layoutTimer = setTimeout(function() {
            $grid.isotope('layout');
            layoutTimer = null;
        }, 150);
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const image = entry.target.querySelector('.lazy-load');
                if (image) {
                    image.src = image.dataset.src;
                    image.classList.remove('lazy-load');
                    observer.unobserve(entry.target);
                    image.onload = function() {
                        debouncedLayout();
                    };
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '100px'
    });

    gridItems.forEach(function(item) {
        observer.observe(item);
    });
}
loadRealImages()

    const loadPageData = async function() {
        const url = baseUrl + '/photos/page/' + page;
        if(page>totalPage){
            document.querySelector('.joe_loading').remove()
            return

        }
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const nextPageImages = doc.querySelectorAll('.grid-item');

                if (nextPageImages.length > 0) {
                    nextPageImages.forEach(image => {
                        $grid.append(image).isotope('appended', image);
                    });
                    $grid.isotope('layout');
                    loadRealImages()
                    page++
                    if(page>totalPage){
                        document.querySelector('.joe_loading').remove()

                    }
                }
            })
            .catch(error => {
                console.error('Error fetching next page data:', error);
            });

    };

    const observerForLoading = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            loadPageData();
        }
    }, {
        threshold: 1
    });

    observerForLoading.observe(loadingIndicator);

    $('.joe_photos__filter li').on('click', function() {
        const filterValue = $(this).attr('data-sjslink');
        $(this).addClass('active').siblings().removeClass('active');
        $grid.isotope({
            filter: function() {
                const sjselValue = $(this).attr('data-sjsel');
                return filterValue === '*' || sjselValue === filterValue;
            }
        });
    });
});
