export const initializePlaylist = () => {
    // Check if playlists are already in localStorage
    const storedLikedMusic = localStorage.getItem('likedMusic');
    const storedPinnedMusic = localStorage.getItem('pinnedMusic');
  
    // Initialize playlists if they don't exist
    if (!storedLikedMusic) {
      localStorage.setItem('likedMusic', JSON.stringify([]));  // Initialize as an empty array if no data
    }
  
    if (!storedPinnedMusic) {
      localStorage.setItem('pinnedMusic', JSON.stringify([]));  // Initialize as an empty array if no data
    }
  };
  