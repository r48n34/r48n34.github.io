"use strict";

// Video of the random list
var videoArr = ["https://www.youtube.com/watch?v=DX8QOI8fIQc", "https://www.youtube.com/watch?v=a0OsuES5LP8", "https://www.youtube.com/watch?v=2yvwbBhPHCk", "https://www.youtube.com/watch?v=Luqw8pzKS2w", "https://www.youtube.com/watch?v=CFWWCR_K8MI", "https://www.youtube.com/watch?v=l7lAUqp35ps", "https://www.youtube.com/watch?v=J3OAwLo4kkY", "https://www.youtube.com/watch?v=j8yUz83NpUQ", "https://www.youtube.com/watch?v=Zwjs8sIA41c", "https://www.youtube.com/watch?v=HQEs3z1zKrI", "https://www.youtube.com/watch?v=h30wrl5ERMo", "https://www.youtube.com/watch?v=sdVTSaUXyKM", "https://www.youtube.com/watch?v=sVJJT8-hA9Y", "https://www.youtube.com/watch?v=U0rn58lCC8U", "https://www.youtube.com/watch?v=2uvYcXc8FzY", "https://www.youtube.com/watch?v=rfmA7t_BWVs", "https://www.youtube.com/watch?v=jkIkFlowb3I", "https://www.youtube.com/watch?v=wRkM2Bhw-Q8", "https://www.youtube.com/watch?v=aT1pu3W08jU", "https://www.youtube.com/watch?v=Wberx_XtgOw", "https://www.youtube.com/watch?v=cisXg21MIe8", "https://www.youtube.com/watch?v=RM8_xjBYo_g", "https://www.youtube.com/watch?v=4nVZlfwRioE", "https://www.youtube.com/watch?v=AMieSGo4_c4", "https://www.youtube.com/watch?v=0F3GmROVGPQ", "https://www.youtube.com/watch?v=oz0OegTu5gQ", "https://www.youtube.com/watch?v=uOmOLAB0Mqk", "https://www.youtube.com/watch?v=U3BidM31SiA", "https://www.youtube.com/watch?v=EesfL5eI9Qg", "https://www.youtube.com/watch?v=byH_tdgOEac", "https://www.youtube.com/watch?v=tUYu_eMyxWg", "https://www.youtube.com/watch?v=DYJUQN4RHEs", "https://www.youtube.com/watch?v=wVkk5mDpyIk", "https://www.youtube.com/watch?v=BI_Wy50p7Fs", "https://www.youtube.com/watch?v=ghvzHWLPGHw", "https://www.youtube.com/watch?v=pjVuQN0Kpz0", "https://www.youtube.com/watch?v=QsfXX0gRKek", "https://www.youtube.com/watch?v=X29FCWUZu4M", "https://www.youtube.com/watch?v=w-1R4tdQEkw", "https://www.youtube.com/watch?v=DO_LfRp-tYY", "https://www.youtube.com/watch?v=t6HQo0Edg_Y", "https://www.youtube.com/watch?v=P_8RJtZ8jN8", "https://www.youtube.com/watch?v=kBJ_HaczuBc", "https://www.youtube.com/watch?v=-k8BbaHfQgY", "https://www.youtube.com/watch?v=JjHO-hrZdec", "https://www.youtube.com/watch?v=nAK1Dm7Xvu4", "https://www.youtube.com/watch?v=3W-UsDg96x8", "https://www.youtube.com/watch?v=W82-FynHKqk", "https://www.youtube.com/watch?v=WchJUIbJv_M", "https://www.youtube.com/watch?v=VHiq34ARbmY", "https://www.youtube.com/watch?v=kmYW9J5J6Ho", "https://www.youtube.com/watch?v=4b3rtPBM-tk", "https://www.youtube.com/watch?v=aqV9cmL34wc", "https://www.youtube.com/watch?v=VsMGaEuh3ZM", "https://www.youtube.com/watch?v=WuTZZylDAEI", "https://www.youtube.com/watch?v=T-4j4_F9h5U", "https://www.youtube.com/watch?v=Q0fHlWTnzBk", "https://www.youtube.com/watch?v=phM-MK_eOzU", "https://www.youtube.com/watch?v=-XOroFnzfjc", "https://www.youtube.com/watch?v=9T0dO5OyOsM", "https://www.youtube.com/watch?v=tCRQPfaGMwY", "https://www.youtube.com/watch?v=sAIKaBjgcC4", "https://www.youtube.com/watch?v=HJCa1SKb7FQ", "https://www.youtube.com/watch?v=G50PS0RQaWY", "https://www.youtube.com/watch?v=eyKyIEZoV9w", "https://www.youtube.com/watch?v=QeESJvhFL4I", "https://www.youtube.com/watch?v=UVjs8o89pMc", "https://www.youtube.com/watch?v=P_-b0jHghqM", "https://www.youtube.com/watch?v=O67A8FS2gw8"]; //random to to a video

function goRandom() {
  var num = Math.floor(Math.random() * videoArr.length); //console.log(num);

  window.open(videoArr[num], '_blank'); //window.location.href = videoArr[num]; 
}