let comments = [];

loadComments();
document.getElementById('comment-add').onclick = function() {
    event.preventDefault();
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');

    let comment = {

        name: commentName.value,
        body: commentBody.value,
        time: Math.floor(Date.now())
    }
    commentName.value = '';
    commentBody.value = '';
    comments.push(comment);
    saveComments();
    showComments();
    console.log(comment);
    comments.innerHTML = '';
};



function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));

}

function loadComments() {
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments() {
    let commentfiled = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function(item) {
        out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`
        out += `<p class="alert alert-primary">${item.name}</p>`
        out += `<p class="alert alert-success">${item.body}</p>`

    });
    commentfiled.innerHTML = out;
}

function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp);

    let time = a.toString();
    return time;
}