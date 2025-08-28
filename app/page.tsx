"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"

type Category = "Food" | "Sports" | "Science" | "Technology"

type GameItem = {
  prompt: string
  caption: string
}

type GameData = {
  [K in Category]: GameItem[]
}

const gameData: GameData = {
  Food: [
    { prompt: "realistic photo of a juicy cheeseburger with melting cheese", caption: "Cheeseburger" },
    { prompt: "a fresh sushi platter with chopsticks on a wooden table", caption: "Sushi" },
    { prompt: "a bowl of creamy spaghetti carbonara with parmesan", caption: "Pasta" },
    { prompt: "a slice of pepperoni pizza with stretchy cheese", caption: "Pizza" },
    { prompt: "a colorful fruit smoothie bowl with berries", caption: "Smoothie Bowl" },
    { prompt: "a stack of fluffy pancakes with maple syrup", caption: "Pancakes" },
    { prompt: "a gourmet chocolate cake with ganache", caption: "Chocolate Cake" },
    { prompt: "a fresh caesar salad with croutons", caption: "Caesar Salad" },
    { prompt: "a bowl of ramen with soft-boiled egg", caption: "Ramen" },
    { prompt: "a plate of fish and chips with tartar sauce", caption: "Fish & Chips" },
    { prompt: "a crispy fried chicken drumstick with herbs", caption: "Fried Chicken" },
    { prompt: "a fresh avocado toast with cherry tomatoes", caption: "Avocado Toast" },
    { prompt: "a bowl of spicy chicken wings with sauce", caption: "Chicken Wings" },
    { prompt: "a grilled steak with rosemary and garlic", caption: "Grilled Steak" },
    { prompt: "a creamy vanilla ice cream cone with sprinkles", caption: "Ice Cream" },
  ],
  Sports: [
    { prompt: "a soccer ball on green grass in a stadium", caption: "Soccer" },
    { prompt: "a basketball going through a hoop", caption: "Basketball" },
    { prompt: "a tennis racket and ball on a court", caption: "Tennis" },
    { prompt: "a football helmet on a field", caption: "Football" },
    { prompt: "a baseball bat and glove with a ball", caption: "Baseball" },
    { prompt: "a swimming pool with lane markers", caption: "Swimming" },
    { prompt: "a golf ball on a tee with clubs", caption: "Golf" },
    { prompt: "a hockey stick and puck on ice", caption: "Hockey" },
    { prompt: "a volleyball net on a beach", caption: "Volleyball" },
    { prompt: "a boxing ring with gloves", caption: "Boxing" },
    { prompt: "a badminton racket and shuttlecock", caption: "Badminton" },
    { prompt: "a cycling helmet and mountain bike", caption: "Cycling" },
    { prompt: "a surfboard on ocean waves", caption: "Surfing" },
    { prompt: "a rock climbing wall with harness", caption: "Rock Climbing" },
    { prompt: "a martial arts dojo with training mats", caption: "Martial Arts" },
  ],
  Science: [
    { prompt: "a microscope with colorful slides in a lab", caption: "Microscope" },
    { prompt: "a DNA double helix structure model", caption: "DNA" },
    { prompt: "a telescope pointing at a starry sky", caption: "Telescope" },
    { prompt: "a periodic table of elements chart", caption: "Periodic Table" },
    { prompt: "a beaker with colorful chemical reactions", caption: "Chemistry" },
    { prompt: "a human brain model with neural pathways", caption: "Brain" },
    { prompt: "a solar system model with planets", caption: "Solar System" },
    { prompt: "a laboratory with test tubes and equipment", caption: "Lab Equipment" },
    { prompt: "a fossil of a dinosaur skeleton", caption: "Fossil" },
    { prompt: "a rocket launching into space", caption: "Rocket" },
    { prompt: "a quantum physics equation on a blackboard", caption: "Quantum Physics" },
    { prompt: "a robotic arm in a research laboratory", caption: "Robotics" },
    { prompt: "a petri dish with bacterial cultures", caption: "Microbiology" },
    { prompt: "a volcano erupting with lava flow", caption: "Geology" },
    { prompt: "a weather satellite orbiting Earth", caption: "Meteorology" },
  ],
  Technology: [
    { prompt: "a sleek smartphone with a glowing screen", caption: "Smartphone" },
    { prompt: "a modern laptop computer open on a desk", caption: "Laptop" },
    { prompt: "a virtual reality headset with controllers", caption: "VR Headset" },
    { prompt: "a robot with LED eyes and metallic body", caption: "Robot" },
    { prompt: "a drone flying in the sky", caption: "Drone" },
    { prompt: "a smartwatch displaying health data", caption: "Smartwatch" },
    { prompt: "a gaming console with wireless controllers", caption: "Gaming Console" },
    { prompt: "a 3D printer creating an object", caption: "3D Printer" },
    { prompt: "a server room with blinking lights", caption: "Servers" },
    { prompt: "an electric car charging at a station", caption: "Electric Car" },
    { prompt: "artificial intelligence neural network visualization", caption: "AI System" },
    { prompt: "a blockchain network with connected nodes", caption: "Blockchain" },
    { prompt: "a holographic display projecting 3D images", caption: "Hologram" },
    { prompt: "a quantum computer with cooling systems", caption: "Quantum Computer" },
    { prompt: "a smart home hub controlling devices", caption: "Smart Home" },
  ],
}

export default function ThisOrThatGame() {
  const [gameState, setGameState] = useState<"category" | "playing" | "finished">("category")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [currentRound, setCurrentRound] = useState(1)
  const [gameItems, setGameItems] = useState<GameItem[]>([])
  const [currentChampion, setCurrentChampion] = useState<GameItem | null>(null)
  const [nextChallenger, setNextChallenger] = useState<GameItem | null>(null)
  const [eliminationHistory, setEliminationHistory] = useState<GameItem[]>([])

  const startGame = (category: Category) => {
    setSelectedCategory(category)
    const items = [...gameData[category]].sort(() => Math.random() - 0.5).slice(0, 11)
    setGameItems(items)
    setCurrentChampion(items[0])
    setNextChallenger(items[1])
    setGameState("playing")
    setCurrentRound(1)
    setEliminationHistory([])
  }

  const makeChoice = (chosen: GameItem) => {
    const eliminated = chosen === currentChampion ? nextChallenger : currentChampion
    const newChampion = chosen
    const newHistory = [...eliminationHistory, eliminated!]

    setEliminationHistory(newHistory)
    setCurrentChampion(newChampion)

    if (currentRound === 10) {
      setGameState("finished")
      return
    }

    const nextChallengerIndex = currentRound + 1
    setNextChallenger(gameItems[nextChallengerIndex])
    setCurrentRound(currentRound + 1)
  }

  const resetGame = () => {
    setGameState("category")
    setSelectedCategory(null)
    setCurrentRound(1)
    setGameItems([])
    setCurrentChampion(null)
    setNextChallenger(null)
    setEliminationHistory([])
  }

  if (gameState === "category") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">This or That</h1>
          <p className="text-muted-foreground text-lg">Choose your category to start the elimination game!</p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md w-full">
          {(Object.keys(gameData) as Category[]).map((category) => (
            <Button
              key={category}
              onClick={() => startGame(category)}
              className="h-20 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    )
  }

  if (gameState === "finished") {
    const finalWinner = currentChampion

    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">🎉 Winner! 🎉</h1>
          <div className="bg-card rounded-lg p-6 mb-6 max-w-sm">
            <img
              src={`/abstract-geometric-shapes.png?key=putgl&height=200&width=200&query=${finalWinner?.prompt}`}
              alt={finalWinner?.caption}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-card-foreground">{finalWinner?.caption}</h2>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Eliminated Items:</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {eliminationHistory.map((item, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  Round {index + 1}: {item.caption}
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={resetGame} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Play Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 relative">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="text-sm">
              {selectedCategory}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Round {currentRound} of 10
            </Badge>
          </div>
          <Progress value={(currentRound / 10) * 100} className="h-2" />
        </div>

        {currentRound > 1 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground">Current Champion:</h3>
              <Badge variant="default" className="text-sm">
                {currentChampion?.caption}
              </Badge>
            </div>
            {eliminationHistory.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Eliminated:</h4>
                <div className="flex flex-wrap gap-2">
                  {eliminationHistory.map((item, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {item.caption}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Choose Your Favorite!</h1>
          <p className="text-muted-foreground">
            {currentRound === 1
              ? "Pick the first champion!"
              : `${currentChampion?.caption} vs ${nextChallenger?.caption}`}
          </p>
        </div>

        {currentChampion && nextChallenger && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[currentChampion, nextChallenger].map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg bg-card border-border"
                onClick={() => makeChoice(item)}
              >
                <div className="p-4">
                  <img
                    src={`/abstract-geometric-shapes.png?key=sfs9m&height=300&width=400&query=${item.prompt}`}
                    alt={item.caption}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold text-center text-card-foreground">{item.caption}</h3>
                  {item === currentChampion && currentRound > 1 && (
                    <div className="text-center mt-2">
                      <Badge variant="default" className="text-xs">
                        Champion
                      </Badge>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent text-accent-foreground rounded-full text-xl font-bold">
            VS
          </div>
        </div>
      </div>
    </div>
  )
}
