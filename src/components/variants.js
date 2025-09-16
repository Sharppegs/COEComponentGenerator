const fadeUp = {
visible: { opacity: 1, y: 0, transition:{duration: 0.5} },
hidden: { opacity: 0, y: "100%" },
}

const fadeUpRapid = {
visible: { opacity: 1, y: 0, transition:{duration: 0.5} },
hidden: { opacity: 0, y: "100%" },
}

const fadeDown = {
visible: { opacity: 1, y: 0, transition:{duration: 1.5} },
hidden: { opacity: 0, y: "-100%" },
}

const fadeLeft = {
visible: { opacity: 1, x: 0, transition:{duration: 1} },
hidden: { opacity: 0, x: "100%" },
}

const fadeRight = {
visible: { opacity: 1, x: 0, transition:{duration: 1.8} },
hidden: { opacity: 0, x: "-100%" },
}

const springLeft = {
visible: { opacity: 1, y: 0, transition:{duration: 1.5}},
hidden: { opacity: 0, y: "100%" },
}

const springRight = {
visible: { opacity: 1, y: 0, transition:{duration: 1.5}},
hidden: { opacity: 0, y: "-100%" },
}

const fadeIn = {
visible: { opacity: 1, transition:{duration: 1.5} },
hidden: { opacity: 0 },
}

export {fadeUp, fadeDown, fadeLeft, fadeRight, fadeIn, fadeUpRapid, springLeft, springRight}