/* INTRO TYPEWRITER */

const introText = "Você também já caminhou sozinho pela noite?"
let introIndex = 0

function escreverIntro() {
  const intro = document.getElementById("intro")
  if (!intro) return

  if (introIndex < introText.length) {
    intro.innerHTML += introText.charAt(introIndex)
    introIndex++
    setTimeout(escreverIntro, 40)
  }
}

escreverIntro()


/* REVEAL AO SCROLL */

const reveals = document.querySelectorAll(".reveal")

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show")
    }
  })
})

reveals.forEach(el => revealObserver.observe(el))


/* TYPEWRITER NAS SECTIONS */

const textos = document.querySelectorAll(".type")

textos.forEach(text => {
  let conteudo = text.textContent.trim()
  text.textContent = ""

  let i = 0

  function escrever() {
    if (i < conteudo.length) {
      text.textContent += conteudo[i]
      i++
      setTimeout(escrever, 35)
    }
  }

  setTimeout(escrever, 500)
})


/* LUA SEGUINDO MOUSE */

const moon = document.querySelector(".moon")

if (moon) {
  document.addEventListener("mousemove", e => {
    moon.style.transform = `translate(${e.clientX / 40}px, ${e.clientY / 40}px)`
  })
}


/* ESTRELAS NO FUNDO */

const canvas = document.getElementById("stars")
let stars
let mx = 0
let my = 0

if (canvas) {

  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  stars = []

  for (let i = 0; i < 150; i++) {

    let x = Math.random() * canvas.width
    let y = Math.random() * canvas.height

    stars.push({
      x: x,
      y: y,
      bx: x,
      by: y,
      r: Math.random() * 1.5,
      d: Math.random() * 1.2 + 0.2
    })
  }

  document.addEventListener("mousemove", e => {
    mx = (e.clientX / window.innerWidth) - 0.5
    my = (e.clientY / window.innerHeight) - 0.5
  })

  function drawStars() {

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "white"

    stars.forEach(s => {

      const ox = mx * 40 * s.d
      const oy = my * 40 * s.d

      s.x += ((s.bx + ox) - s.x) * 0.08
      s.y += ((s.by + oy) - s.y) * 0.08

      ctx.beginPath()
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
      ctx.fill()

    })

    requestAnimationFrame(drawStars)
  }

  drawStars()

  window.addEventListener("resize", () => {

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

  })
}


/* CHUVA */

let chuvaAtiva = false
let rainTimer = null

function chuva(){
  let rain = document.createElement("div")
  rain.classList.add("rain")

  rain.style.left = Math.random() * window.innerWidth + "px"
  rain.style.top = (-60 - Math.random()*200) + "px" 

  document.body.appendChild(rain)

  setTimeout(()=> rain.remove(), 2000)
}

function pararChuva() {
  if (rainTimer) {
    clearInterval(rainTimer)
    rainTimer = null
  }
  document.querySelectorAll(".rain").forEach(r => r.remove())
  chuvaAtiva = false
}

function iniciarChuva(velocidade = 60) {
  pararChuva()
  chuvaAtiva = true
  rainTimer = setInterval(chuva, velocidade)
}


/* ESCOLHA DO USUÁRIO */

const sim = document.getElementById("sim")
const nao = document.getElementById("nao")
const choiceSection = document.querySelector(".choice")
const finalSection = document.querySelector(".final")
const finalH2 = finalSection ? finalSection.querySelector("h2") : null

let finalEscolhido = null

function travarBotoes(msg) {
  if (!choiceSection) return
  choiceSection.classList.add("chosen")
  choiceSection.innerHTML = `
    <h2>Você acredita que ela voltará?</h2>
    <p class="type">${msg}</p>
  `
}

function aplicarFinal(simOuNao) {
  finalEscolhido = simOuNao

  document.body.classList.remove("ending-yes", "ending-no")
  document.body.classList.add(simOuNao === "yes" ? "ending-yes" : "ending-no")

  // Texto final (YES = feliz / NO = triste)
  if (finalH2) {
    if (simOuNao === "yes") {
      finalH2.innerHTML = `
        "O entardecer não apaga a noite —
        mas ensina que ela não dura para sempre.
        Hoje, eu caminho sem esperar."
      `
    } else {
      finalH2.innerHTML = `
        "E se o silêncio for a única resposta...
        então cada passo pesa mais do que antes.
        E a cidade inteira parece me reconhecer."
      `
    }
  }

  // Efeitos (YES = feliz / NO = triste)
  if (simOuNao === "yes") {
    // FELIZ (NÃO clicado)
    pararChuva()
    ligarDust()
    travarBotoes("Não. E aceitar não é perder — é finalmente respirar.")
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  } else {
    // TRISTE (SIM clicado)
    desligarDust()
    iniciarChuva(40)
    travarBotoes("Sim. E a esperança vira um lugar onde eu fico preso.")
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  }
}


if (sim) {
  sim.onclick = () => aplicarFinal("no")
}
if (nao) {
  nao.onclick = () => aplicarFinal("yes") 
}


/* CHUVA FINAL POR SCROLL */

window.addEventListener("scroll", () => {

  if (finalEscolhido === "yes") return

  if (window.scrollY > 2500 && !chuvaAtiva) {

    if (finalEscolhido === "no") {
      iniciarChuva(40)
    } else {
      iniciarChuva(60)
    }
  }
})


/* POEIRA DOURADA */

let dustCanvas, dustCtx
let dustParticles = []
let dustRunning = false
let dustAnimId = null

function criarGoldDust() {
  if (document.getElementById("goldDust")) return

  dustCanvas = document.createElement("canvas")
  dustCanvas.id = "goldDust"
  document.body.appendChild(dustCanvas)

  dustCtx = dustCanvas.getContext("2d")

  function resize() {
    dustCanvas.width = window.innerWidth
    dustCanvas.height = window.innerHeight
  }
  resize()
  window.addEventListener("resize", resize)

  dustParticles = []
  const qtd = Math.floor(Math.min(260, Math.max(120, window.innerWidth / 6)))

  for (let i = 0; i < qtd; i++) {
    dustParticles.push(novaParticula(true))
  }
}

function novaParticula(randomY = false) {
  const w = window.innerWidth
  const h = window.innerHeight

  return {
    x: Math.random() * w,
    y: randomY ? Math.random() * h : (h + Math.random() * 200),
    r: Math.random() * 1.8 + 0.3,
    vx: (Math.random() - 0.5) * 0.18,
    vy: -(Math.random() * 0.22 + 0.08),
    a: Math.random() * 0.35 + 0.15,
    tw: Math.random() * 0.8 + 0.2,
    t: Math.random() * Math.PI * 2
  }
}

function desenharDust() {
  if (!dustRunning || !dustCtx || !dustCanvas) return

  const w = dustCanvas.width
  const h = dustCanvas.height

  dustCtx.clearRect(0, 0, w, h)

  const g = dustCtx.createRadialGradient(
    w * 0.25, h * 0.35, 0,
    w * 0.25, h * 0.35, Math.max(w, h) * 0.9
  )
  g.addColorStop(0, "rgba(255, 210, 140, 0.10)")
  g.addColorStop(1, "rgba(255, 210, 140, 0.00)")
  dustCtx.fillStyle = g
  dustCtx.fillRect(0, 0, w, h)

  for (const p of dustParticles) {
    p.x += p.vx
    p.y += p.vy

    p.t += 0.02 * p.tw
    const sparkle = (Math.sin(p.t) + 1) / 2
    const alpha = p.a * (0.55 + sparkle * 0.85)

    if (p.y < -30 || p.x < -30 || p.x > w + 30) {
      const np = novaParticula(false)
      p.x = np.x
      p.y = np.y
      p.r = np.r
      p.vx = np.vx
      p.vy = np.vy
      p.a = np.a
      p.tw = np.tw
      p.t = np.t
    }

    dustCtx.beginPath()
    dustCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    dustCtx.fillStyle = `rgba(255, 200, 120, ${alpha})`
    dustCtx.fill()

    dustCtx.beginPath()
    dustCtx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2)
    dustCtx.fillStyle = `rgba(255, 170, 100, ${alpha * 0.15})`
    dustCtx.fill()
  }

  dustAnimId = requestAnimationFrame(desenharDust)
}

function ligarDust() {
  criarGoldDust()
  dustRunning = true
  if (dustAnimId) cancelAnimationFrame(dustAnimId)
  desenharDust()
}

function desligarDust() {
  dustRunning = false
  if (dustAnimId) {
    cancelAnimationFrame(dustAnimId)
    dustAnimId = null
  }
  if (dustCtx && dustCanvas) {
    dustCtx.clearRect(0, 0, dustCanvas.width, dustCanvas.height)
  }
}