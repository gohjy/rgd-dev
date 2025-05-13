"use strict";

function cycleSlides(holder, right=true) {
    let currentSlide = holder.querySelector(":scope > .slide-container > .slide[data-display]");
    let allSlides = Array.from(holder.querySelectorAll(":scope > .slide-container > .slide"));
    let loop = right ? allSlides[0] : allSlides[allSlides.length - 1];
    console.log(loop);
    if (!loop) return false;
    let next = allSlides[allSlides.indexOf(currentSlide) + (right ? 1 : -1)];
    currentSlide.removeAttribute("data-display");
    let nowViewing = !!next ? next : loop;
    nowViewing.setAttribute("data-display", "");
    return true;
}

const mainHolder = document.querySelector("#project-display > .main-display > .feature-container");
const allHolders = Array.from(document.querySelectorAll(".feature-container"));
for (let holder of allHolders) {
    const slides = Array.from(holder.querySelectorAll(":scope > .slide-container > .slide"));
    if (slides.length === 0) {
        holder.innerHTML = "<div class=\"slide-container\"><div class=\"slide\" data-display>Sorry, there's no content to display right now.</div></div>";
        continue;
    }
    let activatedSlide = Array.from(holder.querySelectorAll(":scope > .slide-container > .slide[data-display]"));
    if (activatedSlide.length === 0) {
        slides[0].setAttribute("data-display", "");
        activatedSlide.push(slides[0]);
    } else if (activatedSlide.length > 1) {
        for (let slide of activatedSlide.slice(1)) {
            slide.removeAttribute("data-display");
        }
        activatedSlide.splice(1);
    }
    
    if (slides.length > 1) {
        for (let [dir, char] of [["left","<"],["right",">"]]) {
            let button = document.createElement("div");
            button.classList.add(`feat-control-${dir}`);
            button.textContent = char;
            holder.prepend(button);
            button.addEventListener("click", function() {
                cycleSlides(holder, dir==="right");
            });
        }
    }
}

function checkOverflow() {
    /* https://stackoverflow.com/a/7739113 */

    let captions = Array.from(document.querySelectorAll(".caption > .caption-text"));
    /* for (let c of captions) {
        let clone = c.cloneNode(true);
        clone.style.display = "inline-block";
        clone.style.whiteSpace = "nowrap";
        clone.style.xOverflow = "auto";
        clone.style.textOverflow = "unset";
        let tooLong = 0;
        document.body.append(clone);
        console.log(clone);
        let noscroll = clone.clientWidth;
        clone.parentNode.removeChild(clone);
        c.style.display = "inline-block";
        let withscroll = c.clientWidth;
        c.style.display = "";
        tooLong = noscroll - withscroll;
        console.log(noscroll);
        console.log(withscroll);

        if (tooLong > 0) {
            // Overflow!
            c.classList.add("overflowed");
        } else {
            c.style.textOverflow = "unset";
        }
    } */

    let readMores = Array.from(document.querySelectorAll(".caption-text > .read-more"));
    for (let r of readMores) {
        r.addEventListener("click", function() {
            if (r.classList.contains("read-more")) {
                r.parentElement.parentElement.classList.add("caption-screen");
                r.textContent = "Close";
                r.classList.remove("read-more");
                r.classList.add("close-capt-screen");
            } else if (r.classList.contains("close-capt-screen")) {
                r.parentElement.parentElement.classList.remove("caption-screen");
                r.textContent = "Expand";
                r.classList.remove("close-capt-screen");
                r.classList.add("read-more");
            }
        });
        r.textContent = "Expand";
    }
}

checkOverflow(); 