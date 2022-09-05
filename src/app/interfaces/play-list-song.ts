export interface PlayListSong {
  id: number;
  playlistId: number;
  songId: number;
  songName: String;  
  artistName: String;
  photo: String;
  url: String;
  isFavorite: boolean;
}
