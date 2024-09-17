const videoCardContainer = document.querySelector('.video-container');

let api_key = "AIzaSyC1mFYYLS7O4pIiD-rdo9Y_XcLBiSLI7s0"; // Replace with your actual API key
let video_http = "https://www.googleapis.com/youtube/v3/search?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

// Modify the API request to search for mental health-related videos
fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    q: 'Relationship stress tips: Enhance communication, set boundaries, practice empathy, take breaks, focus on solutions, prioritize self-care, seek support, be patient and understanding, practice forgiveness, celebrate good times.', // Add your desired search query here
    type: 'video',
    maxResults: 10,
    regionCode: 'IN' // Adjust the region code if necessary
}))
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to fetch videos: ' + res.status);
        }
        return res.json();
    })
    .then(data => {
        if (data.items && data.items.length > 0) {
            data.items.forEach(item => {
                getChannelIcon(item);
            });
        } else {
            console.error('No video items found in response.');
        }
    })
    .catch(err => console.error('Error fetching videos:', err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
        .then(res => res.json())
        .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
        })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id.videoId}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}

// Search bar functionality
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click', () => {
    if (searchInput.value.length) {
        location.href = searchLink + searchInput.value;
    }
});
