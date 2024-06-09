export default function LoadingAnimation() {
    return (
        <div className="loading-items">
            <div className="loading">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <style jsx>{`
                h1 {
  width: 100%;
  text-align: center;
  margin: 50px 0 150px;
  font-family: arial;
}

.loading-items {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 200px;
    position: relative;
}

.loading-items::before {
    content: '';
    display: inline-block;
    height: 100px;
    border-right: 3px dashed #ccc;
    position: absolute;
}

/* Loading 1 */
.loading {
    position: relative;
    width: 110px;
    display: flex;
    position: relative;
    top: 15px;
}
.loading span {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #000;
    border-radius: 30px;
    position: absolute;
    bottom: 0;
}

.loading span:first-child {
    animation: loading-span1 1.3s infinite;
    left: 0;
}

.loading span:nth-child(2) {
    animation: loading-span2 1.3s infinite;
    left: 40px;
}

.loading span:nth-child(3){
    animation: loading-span3 1.3s infinite;
    left: 80px;
}

@keyframes loading-span1 {
    0% {
        height: 30px;
    }
    25% {
        height: 50px;
    }
    50% {
        height: 30px;
    }
    100% {
        height: 30px;
    }
}

@keyframes loading-span2 {
    0% {
        height: 30px;
    }
    25% {
        height: 30px;
    }
    50% {
        height: 50px;
    }
    75% {
        height: 30px;
    }
    100% {
        height: 30px;
    }
}

@keyframes loading-span3 {
    0% {
        height: 30px;
    }
    25% {
        height: 30px;
    }
    50% {
        height: 30px;
    }
    75% {
        height: 50px;
    }
    100% {
        height: 30px;
    }
}



/* Loading 2 */


.loading2 {
    position: relative;
    width: 110px;
    display: flex;
    align-items: center;
}
.loading2 span {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #000;
    border-radius: 30px;
    position: absolute;
}

.loading2 span:first-child {
    animation: loading2-span1 1.3s infinite;
    left: 0;
}

.loading2 span:nth-child(2) {
    animation: loading2-span2 1.3s infinite;
    left: 40px;
}

.loading2 span:nth-child(3){
    animation: loading2-span3 1.3s infinite;
    left: 80px;
}

@keyframes loading2-span1 {
    0% {
        height: 30px;
    }
    25% {
        height: 60px;
    }
    50% {
        height: 30px;
    }
    100% {
        height: 30px;
    }
}

@keyframes loading2-span2 {
    0% {
        height: 30px;
    }
    25% {
        height: 30px;
    }
    50% {
        height: 60px;
    }
    75% {
        height: 30px;
    }
    100% {
        height: 30px;
    }
}

@keyframes loading2-span3 {
    0% {
        height: 30px;
    }
    25% {
        height: 30px;
    }
    50% {
        height: 30px;
    }
    75% {
        height: 60px;
    }
    100% {
        height: 30px;
    }
}

        `}</style>
        </div >
    )
}