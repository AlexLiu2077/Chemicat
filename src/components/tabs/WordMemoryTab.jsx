import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import wordbooks from '../../data/wordbooks';
import styles from './WordMemoryTab.module.css';
import TopBar from '../TopBar';
import { getAssetUrl } from '../../utils/assetUrl';


function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeOptions(words, correctWord) {
  const uniqueWords = Array.from(new Map(words.map((word) => [word.id, word])).values());
  const wrongWords = shuffle(uniqueWords.filter((word) => word.id !== correctWord.id)).slice(0, 3);
  return shuffle([correctWord, ...wrongWords]);
}

export default function WordMemoryTab({ onQuizActiveChange }) {
  const {
    catFood,
    addCatFood,
    quizProgress,
    favoriteWords,
    saveQuizProgress,
    clearQuizProgress,
    addFavoriteWord,
    removeFavoriteWord,
  } = useUser();
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [feedback, setFeedback] = useState('');

  const favoriteBook = {
    id: 'favorite_memory',
    name: '重点记忆',
    description: '收藏的重点单词',
    image: getAssetUrl('/assets/cover/cover3.png'),

    chapters: [
      { id: 'favorite_words', title: '收藏单词', words: favoriteWords },
    ],
    isFavoriteBook: true,
  };
  const visibleWordbooks = [...wordbooks, favoriteBook];
  const selectedBook = visibleWordbooks.find((book) => book.id === selectedBookId);
  const activeChapter = selectedBook?.chapters.find((chapter) => chapter.id === quiz?.chapterId);
  const activeWords = quiz?.words || activeChapter?.words || [];

  useEffect(() => {
    onQuizActiveChange?.(Boolean(quiz));
    return () => onQuizActiveChange?.(false);
  }, [onQuizActiveChange, quiz]);

  const getProgressKey = (bookId, chapterId) => `${bookId}:${chapterId}`;

  const getChapterOptionWords = (chapter) => {
    if (!chapter.optionGroup || !selectedBook) {
      return chapter.words;
    }

    return selectedBook.chapters
      .filter((bookChapter) => bookChapter.optionGroup === chapter.optionGroup)
      .flatMap((bookChapter) => bookChapter.words);
  };

  const startQuiz = (chapter) => {
    if (chapter.words.length === 0) {
      setFeedback('重点记忆里还没有收藏单词');
      return;
    }

    const progressKey = getProgressKey(selectedBook.id, chapter.id);
    const rawProgress = quizProgress[progressKey] || { roundIndex: 0, cardIndex: 0 };
    const savedProgress = {
      roundIndex: Math.min(1, rawProgress.roundIndex ?? 0),
      cardIndex: Math.min(chapter.words.length - 1, rawProgress.cardIndex ?? 0),
    };
    const quizWords = shuffle(chapter.words);
    const optionWords = getChapterOptionWords(chapter);
    const firstWord = quizWords[savedProgress.cardIndex] || quizWords[0];
    setFeedback('');
    setQuiz({
      progressKey,
      chapterId: chapter.id,
      words: quizWords,
      optionWords,
      roundIndex: savedProgress.roundIndex,
      cardIndex: savedProgress.cardIndex,
      options: makeOptions(optionWords, firstWord),
    });
  };

  const finishQuiz = () => {
    if (quiz?.progressKey) {
      clearQuizProgress(quiz.progressKey);
    }
    setQuiz(null);
    setSelectedBookId(null);
    setFeedback('');
  };

  const backToChapters = () => {
    setQuiz(null);
    setFeedback('');
  };

  const goToNextCard = (addFood) => {
    if (addFood) {
      addCatFood(1);
    }
    const words = activeWords;
    const isLastCard = quiz.cardIndex === words.length - 1;
    const isLastRound = quiz.roundIndex === 1;

    if (isLastCard && isLastRound) {
      finishQuiz();
      return;
    }

    const nextRoundIndex = isLastCard ? quiz.roundIndex + 1 : quiz.roundIndex;
    const nextCardIndex = isLastCard ? 0 : quiz.cardIndex + 1;
    const nextWord = words[nextCardIndex];
    const nextProgress = {
      roundIndex: nextRoundIndex,
      cardIndex: nextCardIndex,
    };
    saveQuizProgress(quiz.progressKey, nextProgress);

    setQuiz({
      ...quiz,
      roundIndex: nextRoundIndex,
      cardIndex: nextCardIndex,
      options: makeOptions(quiz.optionWords || words, nextWord),
    });
  };

  const handleAnswer = (option) => {
    const currentWord = activeWords[quiz.cardIndex];

    if (option.id !== currentWord.id) {
      setFeedback('选错了，再试一次');
      return;
    }

    setFeedback('');
    goToNextCard(true);
  };

  const handleNext = () => {
    setFeedback('');
    goToNextCard(false);
  };

  const handlePrev = () => {
    const isFirstCard = quiz.cardIndex === 0;
    const isFirstRound = quiz.roundIndex === 0;

    if (isFirstCard && isFirstRound) {
      setFeedback('已经是第一题了');
      return;
    }

    setFeedback('');
    const prevRoundIndex = isFirstCard ? quiz.roundIndex - 1 : quiz.roundIndex;
    const prevCardIndex = isFirstCard ? activeWords.length - 1 : quiz.cardIndex - 1;
    const prevWord = activeWords[prevCardIndex];

    const prevProgress = {
      roundIndex: prevRoundIndex,
      cardIndex: prevCardIndex,
    };
    saveQuizProgress(quiz.progressKey, prevProgress);

    setQuiz({
      ...quiz,
      roundIndex: prevRoundIndex,
      cardIndex: prevCardIndex,
      options: makeOptions(quiz.optionWords || activeWords, prevWord),
    });
  };

  if (quiz && activeChapter) {
    const currentWord = activeWords[quiz.cardIndex] || activeWords[0];
    const isEnglishToChinese = quiz.roundIndex === 0;
    const isFavorited = favoriteWords.some((word) => word.id === currentWord.id);
    const remainingCount = activeWords.length * 2
      - (quiz.roundIndex * activeWords.length + quiz.cardIndex);

    return (
      <div className={styles.container}>
        <TopBar />
        <div className={styles.quizHeader}>
          <button className={styles.backBtn} onClick={backToChapters}>
            返回
          </button>
          <div className={styles.quizMenu}>
            <span>剩余 {remainingCount} 张</span>
            <span>猫粮 {catFood}</span>
          </div>
        </div>

        <div className={styles.quizCard}>
          <span className={styles.quizRound}>
            {isEnglishToChinese ? '第一遍' : '第二遍'}
          </span>
          <div className={styles.quizPrompt}>
            {isEnglishToChinese ? currentWord.term : currentWord.meaning}
          </div>
          <button
            className={`${styles.favoriteBtn} ${isFavorited ? styles.favoriteBtnActive : ''}`}
            onClick={() => (
              isFavorited
                ? removeFavoriteWord(currentWord.id)
                : addFavoriteWord(currentWord)
            )}
          >
            {isFavorited ? '⭐ 已收藏' : '☆ 收藏'}
          </button>
        </div>

        <div className={styles.optionGrid}>
          {quiz.options.map((option) => (
            <button
              key={option.id}
              className={styles.optionBtn}
              onClick={() => handleAnswer(option)}
            >
              {isEnglishToChinese ? option.meaning : option.term}
            </button>
          ))}
        </div>

        <div className={styles.navGrid}>
          <button className={styles.navBtn} onClick={handlePrev}>
            ← 上一题
          </button>
          <button className={styles.navBtn} onClick={handleNext}>
            跳过 (无奖励) →
          </button>
        </div>

        {feedback && <p className={styles.feedback}>{feedback}</p>}
      </div>
    );
  }

  if (selectedBook) {
    return (
      <div className={styles.container}>
        <TopBar />
        <div className={styles.headerRow}>
          <button className={styles.backBtn} onClick={() => setSelectedBookId(null)}>
            返回
          </button>
          <h2 className={styles.pageTitle}>{selectedBook.name}</h2>
        </div>

        <div className={styles.chapterList}>
          {selectedBook.chapters.map((chapter) => (
            <button
              key={chapter.id}
              className={styles.chapterCard}
              onClick={() => startQuiz(chapter)}
            >
              <span className={styles.chapterTitle}>{chapter.title}</span>
              <span className={styles.chapterCount}>{chapter.words.length} 个单词</span>
            </button>
          ))}
        </div>
        {feedback && <p className={styles.feedback}>{feedback}</p>}
        {selectedBook.isFavoriteBook && (
          <div className={styles.favoriteList}>
            {favoriteWords.map((word) => (
              <div className={styles.favoriteItem} key={word.id}>
                <span>{word.term} / {word.meaning}</span>
                <button onClick={() => removeFavoriteWord(word.id)}>移除</button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <TopBar />
      <h2 className={styles.pageTitle}>单词记忆</h2>

      <div className={styles.booksList}>
        {visibleWordbooks.map((book) => (
          <WordbookButton key={book.id} book={book} onClick={() => setSelectedBookId(book.id)} />
        ))}
      </div>
    </div>
  );
}

function WordbookButton({ book, onClick }) {
  return (
    <button className={styles.bookButton} onClick={onClick}>
      <div className={styles.bookImageWrap}>
        <img src={book.image} alt={book.name} className={styles.bookImage} />
      </div>
      <div className={styles.bookInfo}>
        <span className={styles.bookName}>{book.name}</span>
        <span className={styles.bookSub}>选择章节</span>
      </div>
    </button>
  );
}
