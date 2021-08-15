const imageList =["image/image.jpg","image/image1.jpg","image/image2.jpg"]
const todayimage = imageList[Math.floor(Math.random()*imageList.length)]
const img = document.createElement("img");
img.src = todayimage;
img.classList.add("back")
document.body.appendChild(img);