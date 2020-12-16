interface AudioPlayer {
  play(): void
  stop(): void
}

const Player = (source: string, loop = true): AudioPlayer => {
  const player = new Audio(source)
  player.loop = loop
  const play = () => {
    player.currentTime = 0
    return new Promise((resolve, reject) => {
      player.onended = () => {
        resolve()
      }
      player.play()
    })
  }
  const stop = () => {
    player.pause()
  }

  return { play, stop }
}

export const bulkAudio = (sources: string[]): AudioPlayer => {
  const players: AudioPlayer[] = []
  
  for (const p in sources) {
    const source = sources[p];
    const player = Player(source, false)
    players.push(player)
  }

  const play = async () => {
    for (const p in players) {
      await players[p].play();  
    }      
  
  }
  const stop = () => {
    players.map(async p => p.stop())

  }
  return {play, stop}

}

export default Player