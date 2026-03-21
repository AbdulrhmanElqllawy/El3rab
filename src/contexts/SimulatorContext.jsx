import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SimulatorContext = createContext(null);

/**
 * SimulatorContext provides:
 * - Exam attempt tracking
 * - Mistake management
 * - Custom folder organization
 * - Performance analytics
 * - Weakness detection
 */
export function SimulatorProvider({ children }) {
  const [attempts, setAttempts] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('simulator_data');
      if (stored) {
        const data = JSON.parse(stored);
        setAttempts(data.attempts || []);
        setMistakes(data.mistakes || []);
        setFolders(data.folders || []);
      }
    } catch (err) {
      console.error('Failed to load simulator data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('simulator_data', JSON.stringify({
      attempts,
      mistakes,
      folders,
    }));
  }, [attempts, mistakes, folders]);

  // ============ ATTEMPT MANAGEMENT ============

  const saveAttempt = useCallback((attemptData) => {
    const attempt = {
      id: `attempt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...attemptData,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };

    setAttempts(prev => [...prev, attempt]);

    // Auto-extract mistakes from attempt
    if (attemptData.questionDetails) {
      const newMistakes = attemptData.questionDetails
        .filter(q => !q.isCorrect)
        .map(q => ({
          id: `mistake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          attemptId: attempt.id,
          questionId: q.id,
          category: q.category,
          difficulty: q.difficulty || 'medium',
          userAnswer: q.userAnswer,
          correctAnswer: q.correctAnswer,
          questionText: q.text,
          explanation: q.explanation || null,
          folderId: null,
          notes: '',
          retries: 0,
          createdAt: new Date().toISOString(),
        }));

      setMistakes(prev => [...prev, ...newMistakes]);
    }

    return attempt;
  }, []);

  const getAttemptById = useCallback((id) => {
    return attempts.find(a => a.id === id);
  }, [attempts]);

  const getAttemptsByType = useCallback((type) => {
    return attempts.filter(a => a.type === type);
  }, [attempts]);

  const getAttemptsInDateRange = useCallback((startDate, endDate) => {
    return attempts.filter(a => {
      const date = new Date(a.createdAt);
      return date >= startDate && date <= endDate;
    });
  }, [attempts]);

  // ============ MISTAKE MANAGEMENT ============

  const recordMistake = useCallback((mistakeData) => {
    const mistake = {
      id: `mistake_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...mistakeData,
      retries: 0,
      createdAt: new Date().toISOString(),
    };
    setMistakes(prev => [...prev, mistake]);
    return mistake;
  }, []);

  const getMistakesForDate = useCallback((date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mistakes.filter(m => m.createdAt.startsWith(dateStr));
  }, [mistakes]);

  const getMistakesByCategory = useCallback((category) => {
    return mistakes.filter(m => m.category === category);
  }, [mistakes]);

  const getMistakesByDifficulty = useCallback((difficulty) => {
    return mistakes.filter(m => m.difficulty === difficulty);
  }, [mistakes]);

  const getMistakesForFolder = useCallback((folderId) => {
    if (!folderId) return mistakes.filter(m => !m.folderId);
    return mistakes.filter(m => m.folderId === folderId);
  }, [mistakes]);

  const updateMistakeNotes = useCallback((mistakeId, notes) => {
    setMistakes(prev => prev.map(m =>
      m.id === mistakeId ? { ...m, notes } : m
    ));
  }, []);

  const moveMistakeToFolder = useCallback((mistakeId, folderId) => {
    setMistakes(prev => prev.map(m =>
      m.id === mistakeId ? { ...m, folderId } : m
    ));
  }, []);

  const removeMistake = useCallback((mistakeId) => {
    setMistakes(prev => prev.filter(m => m.id !== mistakeId));
  }, []);

  // ============ FOLDER MANAGEMENT ============

  const createFolder = useCallback((name, description = '', color = '#6C4CF1') => {
    const folder = {
      id: `folder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      color,
      mistakeIds: [],
      createdAt: new Date().toISOString(),
    };
    setFolders(prev => [...prev, folder]);
    return folder;
  }, []);

  const deleteFolder = useCallback((folderId) => {
    setFolders(prev => prev.filter(f => f.id !== folderId));
    // Move mistakes back to unfoldered
    setMistakes(prev => prev.map(m =>
      m.folderId === folderId ? { ...m, folderId: null } : m
    ));
  }, []);

  const updateFolder = useCallback((folderId, updates) => {
    setFolders(prev => prev.map(f =>
      f.id === folderId ? { ...f, ...updates } : f
    ));
  }, []);

  // ============ ANALYTICS & INSIGHTS ============

  /**
   * Get daily mistakes grouped by date
   * Returns: { dateStr: { date, count, mistakes, categories } }
   */
  const getDailyMistakes = useCallback(() => {
    const grouped = {};
    mistakes.forEach(m => {
      const dateStr = m.createdAt.split('T')[0];
      if (!grouped[dateStr]) {
        grouped[dateStr] = {
          date: new Date(dateStr),
          count: 0,
          mistakes: [],
          categories: {},
        };
      }
      grouped[dateStr].count += 1;
      grouped[dateStr].mistakes.push(m);

      if (!grouped[dateStr].categories[m.category]) {
        grouped[dateStr].categories[m.category] = 0;
      }
      grouped[dateStr].categories[m.category] += 1;
    });

    return Object.keys(grouped)
      .sort()
      .reverse()
      .reduce((acc, key) => ({ ...acc, [key]: grouped[key] }), {});
  }, [mistakes]);

  /**
   * Question-level analytics
   * Returns: { questionId: { attempts, correct, successRate, ... } }
   */
  const getQuestionAnalytics = useCallback(() => {
    const stats = {};

    attempts.forEach(attempt => {
      if (!attempt.questionDetails) return;

      attempt.questionDetails.forEach(q => {
        if (!stats[q.id]) {
          stats[q.id] = {
            questionId: q.id,
            questionText: q.text,
            category: q.category,
            difficulty: q.difficulty,
            attempts: 0,
            correct: 0,
            wrong: 0,
            timeSpent: 0,
            avgTime: 0,
          };
        }

        stats[q.id].attempts += 1;
        if (q.isCorrect) {
          stats[q.id].correct += 1;
        } else {
          stats[q.id].wrong += 1;
        }
        stats[q.id].timeSpent += q.timeSpent || 0;
        stats[q.id].avgTime = stats[q.id].timeSpent / stats[q.id].attempts;
      });
    });

    return Object.values(stats).map(q => ({
      ...q,
      successRate: q.attempts > 0 ? Math.round((q.correct / q.attempts) * 100) : 0,
    }));
  }, [attempts]);

  /**
   * Bank & Exam analytics
   * Returns aggregated stats by exam type
   */
  const getExamAnalytics = useCallback(() => {
    const stats = {};

    attempts.forEach(attempt => {
      const key = attempt.type;
      if (!stats[key]) {
        stats[key] = {
          type: key,
          attempts: 0,
          bestScore: 0,
          avgScore: 0,
          totalScore: 0,
          totalDuration: 0,
          avgAccuracy: 0,
          categoryPerformance: {},
        };
      }

      stats[key].attempts += 1;
      stats[key].totalScore += attempt.accuracy;
      stats[key].bestScore = Math.max(stats[key].bestScore, attempt.accuracy);
      stats[key].totalDuration += attempt.duration;
      stats[key].avgScore = stats[key].totalScore / stats[key].attempts;

      // Track category performance
      Object.entries(attempt.categoryPerformance || {}).forEach(([cat, acc]) => {
        if (!stats[key].categoryPerformance[cat]) {
          stats[key].categoryPerformance[cat] = { total: 0, count: 0 };
        }
        stats[key].categoryPerformance[cat].total += acc;
        stats[key].categoryPerformance[cat].count += 1;
      });
    });

    // Calculate average accuracy per category
    Object.values(stats).forEach(stat => {
      Object.entries(stat.categoryPerformance).forEach(([_cat, data]) => {
        stat.categoryPerformance[_cat] = Math.round(data.total / data.count);
      });
    });

    return stats;
  }, [attempts]);

  /**
   * Detect weak topics where student struggles
   */
  const detectWeakTopics = useCallback((threshold = 60) => {
    const categoryStats = {};

    attempts.forEach(attempt => {
      Object.entries(attempt.categoryPerformance || {}).forEach(([cat, acc]) => {
        if (!categoryStats[cat]) {
          categoryStats[cat] = { total: 0, count: 0 };
        }
        categoryStats[cat].total += acc;
        categoryStats[cat].count += 1;
      });
    });

    return Object.entries(categoryStats)
      .map(([category, data]) => ({
        category,
        avgAccuracy: Math.round(data.total / data.count),
        attemptCount: data.count,
        isWeak: Math.round(data.total / data.count) < threshold,
      }))
      .filter(t => t.isWeak)
      .sort((a, b) => a.avgAccuracy - b.avgAccuracy);
  }, [attempts]);

  /**
   * Get performance trends over time
   */
  const getPerformanceTrend = useCallback((days = 30) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const daily = {};

    attempts
      .filter(a => {
        const date = new Date(a.createdAt);
        return date >= startDate && date <= endDate;
      })
      .forEach(attempt => {
        const dateStr = attempt.createdAt.split('T')[0];
        if (!daily[dateStr]) {
          daily[dateStr] = { attempts: 0, totalAccuracy: 0, avgAccuracy: 0 };
        }
        daily[dateStr].attempts += 1;
        daily[dateStr].totalAccuracy += attempt.accuracy;
        daily[dateStr].avgAccuracy = Math.round(
          daily[dateStr].totalAccuracy / daily[dateStr].attempts
        );
      });

    return Object.entries(daily)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, data]) => ({
        date,
        accuracy: data.avgAccuracy,
        attempts: data.attempts,
      }));
  }, [attempts]);

  /**
   * Get overall statistics
   */
  const getOverallStats = useCallback(() => {
    if (attempts.length === 0) {
      return {
        totalAttempts: 0,
        avgAccuracy: 0,
        totalMistakes: 0,
        totalStudyTime: 0,
        bestScore: 0,
        worstScore: 0,
      };
    }

    const accuracies = attempts.map(a => a.accuracy);
    const totalTime = attempts.reduce((sum, a) => sum + (a.duration || 0), 0);

    return {
      totalAttempts: attempts.length,
      avgAccuracy: Math.round(accuracies.reduce((a, b) => a + b) / accuracies.length),
      totalMistakes: mistakes.length,
      totalStudyTime: totalTime,
      bestScore: Math.max(...accuracies),
      worstScore: Math.min(...accuracies),
      mistakesThisWeek: mistakes.filter(m => {
        const date = new Date(m.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return date >= weekAgo;
      }).length,
    };
  }, [attempts, mistakes]);

  /**
   * Get suggested practice exams based on weak topics
   */
  const getSuggestedPractice = useCallback((count = 5) => {
    const weakTopics = detectWeakTopics(65);
    if (weakTopics.length === 0) return [];

    return weakTopics.slice(0, count).map(topic => ({
      type: 'banks',
      reason: `You struggle with ${topic.category} (${topic.avgAccuracy}% accuracy)`,
      focusCategory: topic.category,
      difficulty: topic.avgAccuracy < 50 ? 'easy' : 'medium',
    }));
  }, [detectWeakTopics]);

  /**
   * Get time analysis
   */
  const getTimeAnalysis = useCallback(() => {
    if (attempts.length === 0) return null;

    const allQuestions = [];
    attempts.forEach(a => {
      if (a.questionDetails) {
        allQuestions.push(...a.questionDetails);
      }
    });

    if (allQuestions.length === 0) return null;

    const avgTime = allQuestions.reduce((sum, q) => sum + (q.timeSpent || 0), 0) / allQuestions.length;
    const fast = allQuestions.filter(q => (q.timeSpent || 0) < avgTime * 0.7);
    const slow = allQuestions.filter(q => (q.timeSpent || 0) > avgTime * 1.3);

    return {
      avgTimePerQuestion: Math.round(avgTime),
      fastQuestions: fast.length,
      slowQuestions: slow.length,
      fastAccuracy: fast.length > 0
        ? Math.round(fast.filter(q => q.isCorrect).length / fast.length * 100)
        : 0,
      slowAccuracy: slow.length > 0
        ? Math.round(slow.filter(q => q.isCorrect).length / slow.length * 100)
        : 0,
    };
  }, [attempts]);

  const value = {
    // State
    attempts,
    mistakes,
    folders,
    loading,

    // Attempt methods
    saveAttempt,
    getAttemptById,
    getAttemptsByType,
    getAttemptsInDateRange,

    // Mistake methods
    recordMistake,
    getMistakesForDate,
    getMistakesByCategory,
    getMistakesByDifficulty,
    getMistakesForFolder,
    updateMistakeNotes,
    moveMistakeToFolder,
    removeMistake,

    // Folder methods
    createFolder,
    deleteFolder,
    updateFolder,

    // Analytics methods
    getDailyMistakes,
    getQuestionAnalytics,
    getExamAnalytics,
    detectWeakTopics,
    getPerformanceTrend,
    getOverallStats,
    getSuggestedPractice,
    getTimeAnalysis,
  };

  return (
    <SimulatorContext.Provider value={value}>
      {children}
    </SimulatorContext.Provider>
  );
}

export function useSimulator() {
  const context = useContext(SimulatorContext);
  if (!context) {
    throw new Error('useSimulator must be used within SimulatorProvider');
  }
  return context;
}
