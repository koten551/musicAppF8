
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSIC_PLAYER'; 

const songName = $(".header h2");
const cdThumb = $(".cd__thumb");
const audio = $("#audio");
const cd = $('.cd');
const playBtn = $('.play');
const next = $('.next');
const prev = $('.prev');
const random = $('.random');
const progress = $("#progress");
const repeat = $('.repeat');
const songActive = $('.songActive');
const playlist = $('.playlist');
const volume = $('#volume');
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isChange: false,
    config: JSON.parse(localStorage.getItem('MUSIC_PLAYER')) || {},
    setConfig: function(key, value) {
      this.config[key] = value;
      localStorage.setItem('MUSIC_PLAYER', JSON.stringify(this.config));
    },
    songs: [
        {
          name: "Click Pow Get Down",
          singer: "Raftaar x Fortnite",
          path: "/musicPlayer/song/24h.mp3",
          image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
          name: "Tu Phir Se Aana",
          singer: "Raftaar x Salim Merchant x Karma",
          path: "/musicPlayer/song/102.mp3",
          image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
        },
        {
          name: "Naachne Ka Shaunq",
          singer: "Raftaar x Brobha V",
          path:"/musicPlayer/song/Believe.mp3",
          image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
        },
        {
          name: "Mantoiyat",
          singer: "Raftaar x Nawazuddin Siddiqui",
          path: "/musicPlayer/song/cryoveryou.mp3",
          image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
        },
        {
          name: "Aage Chal",
          singer: "Raftaar",
          path: "/musicPlayer/song/duong1chieu.mp3",
          image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
        },
        {
          name: "Damn",
          singer: "Raftaar x kr$na",
          path:"/musicPlayer/song/ngaynao.mp3",
          image:
            "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "/musicPlayer/song/WaitingForLove.mp3",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "/musicPlayer/song/WaitingForLove.mp3",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "/musicPlayer/song/WaitingForLove.mp3",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "/musicPlayer/song/WaitingForLove.mp3",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "/musicPlayer/song/WaitingForLove.mp3",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        },
        {
          name: "Feeling You",
          singer: "Raftaar x Harjas",
          path: "/musicPlayer/song/WaitingForLove.mp3",
          image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
        }
      ],
    defineProperties: function() {
      Object.defineProperty(this, "currentSong", {
        get: function() {
          return this.songs[this.currentIndex]
        }
      })
    },
    render: function() {
      const htmls = this.songs.map((song, index) => {
        return `                
          <li class="song"data-index="${index}">
            <div class="song__thumb" style="background-image: url('${song.image}')"></div>
            <div class="body">
                <h2>${song.name}</h2>
                <h4>${song.singer}</h4>
            </div>
            <div class="option">
                <i class="fa-solid fa-ellipsis"></i>
            </div>
          </li>`
      })
      document.querySelector(".playlist").innerHTML = htmls.join("")
    },
    handleEvent: function() {  
      const _this = this

      // xử lý cd quay 
      const cdAnimate = cdThumb.animate([{transform: 'rotate(360deg)'}],{duration: 10000, iterations: Infinity})
      cdAnimate.pause()
      //thu nhỏ CD thumb
      const cdWidth = cd.offsetWidth
      document.onscroll = function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const newCdWidth =  cdWidth - scrollTop
        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
        cd.style.opacity = newCdWidth / cdWidth 
      }

      // xử lý nút play
      playBtn.onclick = function() {
        if(_this.isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
      }
      //khi bài hát đang phát 
      audio.onplay = function() {
        playBtn.classList.add('playing');
        _this.isPlaying = true;
        cdAnimate.play()
        _this.setConfig('lastIndex', _this.currentIndex)
      }
      //khi bài hát đang dừng
      audio.onpause = function () {
        playBtn.classList.remove('playing');
        _this.isPlaying = false;
        cdAnimate.pause();
      }

      // khi tiến độ thay đổi 
      progress.onmousedown = function() { // kiểm tra người dùng có đang giữ thanh tiến độ
        _this.isChange = true;
      }
      audio.ontimeupdate = function() {
        progressPercent = Math.floor(audio.currentTime /audio.duration * 100) ? audio.currentTime /audio.duration * 100 : 0;
        if(!_this.isChange) { // không thay đổi tiến độ khi người dùng đang điều khiển thanh tiến độ
          progress.value = progressPercent;
        }
      }
      //khi tua bài hát 
      progress.onchange = function(e) {
        audio.currentTime = e.target.value*audio.duration/100; 
      }

      //next
      next.onclick = function() {
        if(_this.isRandom) {
          _this.playRandomSong()
        } else {
          _this.nextSong()
        }
        audio.play()
        _this.listSelect()
      }

      //prev
      prev.onclick = function() {
        if(_this.isRandom) {
          _this.playRandomSong()
        } else {
          _this.prevSong()
        }
        audio.play()
        _this.listSelect()
      }
      //random 
      random.onclick = function() {
        _this.isRandom = !_this.isRandom
        _this.setConfig('isRandom', _this.isRandom);
        random.classList.toggle('btn-active',_this.isRandom)
      }

      // khi hết 1 bài 
      audio.onended = function () {
        if(_this.isRepeat) {
          playBtn.click()
        } else {
          next.click()
        }
      }
      //xử lý lặp lại 
        repeat.onclick = function () {
        _this.isRepeat = !_this.isRepeat;
        _this.setConfig('isRepeat', _this.isRepeat);
        repeat.classList.toggle("btn-active",_this.isRepeat);
      }
      //xử lý click vào playlist
      playlist.onclick = function(e) {
        const songNote = e.target.closest(".song:not(.song-active)");
        if(songNote || e.target.closest(".option")) {

          // bấm vào nút option
          if(e.target.closest(".option")) {

          } else       
          //bấm vào bài hát
          if(songNote) {
            _this.currentIndex = songNote.dataset.index;
            _this.loadCurrentSong();
            _this.listSelect();
            audio.play();
          }
        }
      }
      //xử lý âm lượng 
      volume.onchange = function() {
        audio.volume =volume.value/100;
        _this.setConfig('volume', volume.value);
      }
      
    },
    loadConfig: function() {
      this.isRandom = this.config.isRandom || false;
      this.isRepeat = this.config.isRepeat || false;
      this.currentIndex = this.config.lastIndex || 0;
      volume.value = this.config.volume || 100;
    },
    nextSong: function() {
      if(this.currentIndex < this.songs.length - 1) {
        this.currentIndex++;
      } else if(this.currentIndex == this.songs.length - 1) {
        this.currentIndex = 0;
      }
      this.loadCurrentSong()
    },
    prevSong: function() {
      if(this.currentIndex > 0) {
        this.currentIndex--;
      } else if(this.currentIndex == 0) {
        this.currentIndex = this.songs.length-1;
      }
      this.loadCurrentSong()    
    },
    loadCurrentSong: function() {
      songName.innerText = app.currentSong.name;
      cdThumb.style.backgroundImage = `url('${app.currentSong.image}')`;
      audio.src = app.currentSong.path
    },
    playRandomSong: function() {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * this.songs.length)
      } while(newIndex == this.currentIndex)
      this.currentIndex = newIndex;
      this.loadCurrentSong()
    },
    listSelect: function() {
      const songList = $$('.song');
      const scrollOption = {
        behavior: 'smooth',
        block: 'nearest'  
      }
      for(let i = 0; i < songList.length; i++) {
        if(songList[i].dataset.index == this.currentIndex) {
          songList[i].classList.add('song-active');
          if(i <= 4) {
            scrollOption.block = 'center'; 
          }
          setTimeout(function() {
            songList[i].scrollIntoView(scrollOption);
          },200)
        } else {
          songList[i].classList.remove('song-active');
        }
      }
    },
    start: function() {
      this.defineProperties()
      this.loadConfig()
      this.render()
      this.listSelect()
      this.handleEvent()
      this.loadCurrentSong()
      repeat.classList.toggle("btn-active",this.isRepeat);
      random.classList.toggle("btn-active",this.isRandom);
    }
}

app.start()