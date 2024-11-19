import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '../utils/icons';

const MemoryCard = ({ card, onClick, isFlipped, isMatched }) => (
  <motion.button
    className={`aspect-square rounded-xl text-2xl font-bold flex items-center justify-center relative
                ${isMatched ? 'bg-green-500/20' : 'glass-panel'}`}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className="w-full h-full absolute"
      initial={false}
      animate={{
        rotateY: isFlipped ? 180 : 0,
      }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute w-full h-full backface-hidden flex items-center justify-center">
        <span className="text-blue-500">π</span>
      </div>
      <div
        className="absolute w-full h-full backface-hidden flex items-center justify-center"
        style={{ transform: 'rotateY(180deg)' }}
      >
        <span className="text-blue-400">{card.digit}</span>
      </div>
    </motion.div>
  </motion.button>
);

MemoryCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    digit: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  isMatched: PropTypes.bool.isRequired,
};

const PiDigitRush = () => {
  const [currentDigit, setCurrentDigit] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScores, setHighScores] = useState([]);

  const endGame = useCallback(() => {
    setIsPlaying(false);
    setHighScores(prev => [...prev, score].sort((a, b) => b - a).slice(0, 5));
  }, [score]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [isPlaying, timeLeft, endGame]);

  const startGame = () => {
    setIsPlaying(true);
    setTimeLeft(30);
    setScore(0);
    generateNewDigit();
  };

  const generateNewDigit = () => {
    setCurrentDigit(Math.floor(Math.random() * 10).toString());
    setUserInput('');
  };

  const handleInput = e => {
    if (!isPlaying) return;
    const input = e.target.value;
    setUserInput(input);
    if (input === currentDigit) {
      setScore(s => s + 1);
      generateNewDigit();
    }
  };

  return (
    <div className="glass-panel p-6">
      <h2 className="text-2xl font-bold mb-4">Pi Digit Rush</h2>
      <div className="text-center mb-6">
        {!isPlaying ? (
          <motion.button
            className="button-primary"
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Game
          </motion.button>
        ) : (
          <div className="space-y-4">
            <div className="text-4xl font-bold text-blue-400 mb-4">{currentDigit}</div>
            <input
              type="text"
              value={userInput}
              onChange={handleInput}
              className="input-field text-center text-2xl w-20"
              maxLength={1}
              autoFocus
            />
            <div className="flex justify-around">
              <div className="text-blue-300">Score: {score}</div>
              <div className="text-blue-300">Time: {timeLeft}s</div>
            </div>
          </div>
        )}
      </div>
      {highScores.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">High Scores</h3>
          <div className="space-y-2">
            {highScores.map((score, index) => (
              <div key={index} className="flex justify-between text-blue-200">
                <span>#{index + 1}</span>
                <span>{score} points</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Define piDigits outside of component to avoid recreation
const piDigits = {
  easy: ['3', '1', '4', '1', '5', '9', '2', '6', '5', '3', '5', '8'],
  medium: ['3', '1', '4', '1', '5', '9', '2', '6', '5', '3', '5', '8', '9', '7', '9', '3'],
  hard: [
    '3',
    '1',
    '4',
    '1',
    '5',
    '9',
    '2',
    '6',
    '5',
    '3',
    '5',
    '8',
    '9',
    '7',
    '9',
    '3',
    '2',
    '3',
    '8',
    '4',
  ],
};

const PiMemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

  const initializeGame = useCallback(() => {
    const shuffledCards = [...piDigits[difficulty], ...piDigits[difficulty]]
      .sort(() => Math.random() - 0.5)
      .map((digit, index) => ({
        id: index,
        digit,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setScore(0);
  }, [difficulty]);

  useEffect(() => {
    if (gameStarted) {
      initializeGame();
    }
  }, [gameStarted, initializeGame]);

  const handleCardClick = id => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].digit === cards[second].digit) {
        setMatched([...matched, first, second]);
        setScore(s => s + 10);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
        setScore(s => Math.max(0, s - 2));
      }
    }
  };

  const getDifficultyBonus = () => {
    const bonuses = {
      easy: 1,
      medium: 1.5,
      hard: 2,
    };
    return bonuses[difficulty] || 1;
  };

  const getFinalScore = () => {
    const baseScore = score;
    const movesPenalty = moves * 0.5;
    const difficultyBonus = getDifficultyBonus();
    return Math.round((baseScore - movesPenalty) * difficultyBonus);
  };

  return (
    <div className="glass-panel p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4">π Memory Match</h2>
        <p className="text-blue-200 mb-4">Match pairs of π digits to win!</p>
        {!gameStarted ? (
          <div className="space-y-4">
            <div className="flex justify-center gap-4 mb-4">
              {['easy', 'medium', 'hard'].map(level => (
                <motion.button
                  key={level}
                  className={`px-4 py-2 rounded-full ${
                    difficulty === level ? 'bg-blue-500' : 'glass-panel'
                  }`}
                  onClick={() => setDifficulty(level)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </motion.button>
              ))}
            </div>
            <motion.button
              className="button-primary"
              onClick={() => setGameStarted(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Game
            </motion.button>
          </div>
        ) : (
          <div className="flex justify-center gap-8 mb-6">
            <div className="text-blue-300">Moves: {moves}</div>
            <div className="text-blue-300">Score: {score}</div>
            <button className="text-blue-400 hover:text-blue-300" onClick={initializeGame}>
              Reset
            </button>
          </div>
        )}
      </div>

      {gameStarted && (
        <motion.div
          className="grid grid-cols-4 gap-4 max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {cards.map(card => (
            <MemoryCard
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card.id)}
              isFlipped={flipped.includes(card.id) || matched.includes(card.id)}
              isMatched={matched.includes(card.id)}
            />
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {matched.length === cards.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="glass-panel p-8 text-center max-w-md mx-auto">
              <h3 className="text-xl font-bold text-green-400 mb-2">Congratulations! 🎉</h3>
              <p className="text-blue-200 mb-4">You completed the game in {moves} moves!</p>
              <p className="text-lg font-semibold mb-4">Final Score: {getFinalScore()}</p>
              <div className="space-y-2">
                <motion.button className="button-primary w-full" onClick={initializeGame}>
                  Play Again
                </motion.button>
                <motion.button
                  className="button-secondary w-full"
                  onClick={() => setGameStarted(false)}
                >
                  Change Difficulty
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Games = () => {
  const [activeGame, setActiveGame] = useState('memory');

  const games = [
    { id: 'memory', name: 'π Memory Match', icon: Icons.Grid },
    { id: 'rush', name: 'Pi Digit Rush', icon: Icons.Timer },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto p-4 space-y-8"
    >
      <div className="glass-panel p-8">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-6 gradient-text text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          π Games
        </motion.h1>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {games.map(game => (
            <motion.button
              key={game.id}
              className={`px-6 py-3 rounded-full flex items-center gap-2 ${
                activeGame === game.id ? 'bg-blue-500' : 'glass-panel'
              }`}
              onClick={() => setActiveGame(game.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <game.icon className="w-5 h-5" />
              {game.name}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeGame}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {activeGame === 'memory' ? <PiMemoryGame /> : <PiDigitRush />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Games;
