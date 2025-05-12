/**
 * 瑞文标准智力测验
 * Raven's Standard Progressive Matrices
 */

// 测试数据
const testData = {
    // A组 - 主要测知觉辨别力，图形比较，图形想象力
    set: [
        { id: 'IQ-1', options: 6, answer: 4 },
        { id: 'IQ-2', options: 6, answer: 6 },
        { id: 'IQ-3', options: 6, answer: 1 },
        { id: 'IQ-4', options: 6, answer: 2 },
        { id: 'IQ-5', options: 6, answer: 6 },
        { id: 'IQ-6', options: 6, answer: 3 },
        { id: 'IQ-7', options: 6, answer: 6 },
        { id: 'IQ-8', options: 6, answer: 2 },
        { id: 'IQ-9', options: 6, answer: 1 },
        { id: 'IQ-10', options: 6, answer: 3 },
        { id: 'IQ-11', options: 6, answer: 4 },
        { id: 'IQ-12', options: 6, answer: 5 },
        
        { id: 'IQ-13', options: 6, answer: 2 },
        { id: 'IQ-14', options: 6, answer: 6 },
        { id: 'IQ-15', options: 6, answer: 1 },
        { id: 'IQ-16', options: 6, answer: 1 },
        { id: 'IQ-17', options: 6, answer: 1 },
        { id: 'IQ-18', options: 6, answer: 3 },
        { id: 'IQ-19', options: 6, answer: 5 },
        { id: 'IQ-20', options: 6, answer: 5 },
        { id: 'IQ-21', options: 6, answer: 4 },
        { id: 'IQ-22', options: 6, answer: 3 },
        { id: 'IQ-23', options: 6, answer: 4 },
        { id: 'IQ-24', options: 6, answer: 5 },

        { id: 'IQ-25', options: 6, answer: 6 },
        { id: 'IQ-26', options: 6, answer: 2 },
        { id: 'IQ-27', options: 6, answer: 3 },
        { id: 'IQ-28', options: 6, answer: 6 },
        { id: 'IQ-29', options: 6, answer: 5 },
        { id: 'IQ-30', options: 6, answer: 4 },
        { id: 'IQ-31', options: 6, answer: 5 },
        { id: 'IQ-32', options: 6, answer: 1 },
        { id: 'IQ-33', options: 6, answer: 5 },
        { id: 'IQ-34', options: 6, answer: 6 },
        { id: 'IQ-35', options: 6, answer: 1 },
        { id: 'IQ-36', options: 6, answer: 2 },

        { id: 'IQ-37', options: 6, answer: 3 },
        { id: 'IQ-38', options: 6, answer: 4 },
        { id: 'IQ-39', options: 6, answer: 5 },
        { id: 'IQ-40', options: 6, answer: 3 },
        { id: 'IQ-41', options: 6, answer: 6 },
        { id: 'IQ-42', options: 6, answer: 6 },
        { id: 'IQ-43', options: 6, answer: 5 },
        { id: 'IQ-44', options: 6, answer: 4 },
        { id: 'IQ-45', options: 6, answer: 1 },
        { id: 'IQ-46', options: 6, answer: 2 },
        { id: 'IQ-47', options: 6, answer: 5 },
        { id: 'IQ-48', options: 6, answer: 6 },

        { id: 'IQ-49', options: 6, answer: 5 },
        { id: 'IQ-50', options: 6, answer: 6 },
        { id: 'IQ-51', options: 6, answer: 6 },
        { id: 'IQ-52', options: 6, answer: 2 },
        { id: 'IQ-53', options: 6, answer: 1 },
        { id: 'IQ-54', options: 6, answer: 5 },
        { id: 'IQ-55', options: 6, answer: 1 },
        { id: 'IQ-56', options: 6, answer: 6 },
        { id: 'IQ-57', options: 6, answer: 3 },
        { id: 'IQ-58', options: 6, answer: 2 },
        { id: 'IQ-59', options: 6, answer: 4 },
        { id: 'IQ-60', options: 6, answer: 5 }
    ]
};

// 评估等级
const evaluationLevels = [
    { min: 50, label: '优秀' },
    { min: 40, label: '良好' },
    { min: 30, label: '中等' },
    { min: 20, label: '中下' },
    { min: 0, label: '低下' }
];

// 全局变量
let currentQuestion = 0;
let userAnswers = [];
let userName = '';
let allQuestions = [];
let useImageFallback = true; // 是否使用图像备用方案

// DOM 元素
const introContainer = document.getElementById('intro-container');
const testContainer = document.getElementById('test-container');
const resultsContainer = document.getElementById('results-container');
const questionContainer = document.getElementById('question-container');
const progressBar = document.getElementById('progress-bar');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const userNameInput = document.getElementById('user-name');
const startTestBtn = document.getElementById('start-test');
const restartTestBtn = document.getElementById('restart-test');

// 初始化函数
function init() {
    // 合并所有问题并重置用户答案
    allQuestions = [
        ...testData.set
    ];
    
    userAnswers = new Array(allQuestions.length).fill(null);
    
    // 事件监听
    startTestBtn.addEventListener('click', startTest);
    restartTestBtn.addEventListener('click', restartTest);
    prevBtn.addEventListener('click', goToPrevQuestion);
    nextBtn.addEventListener('click', goToNextQuestion);
    
    // 初始状态
    totalQuestionsEl.textContent = allQuestions.length;
    
    // 检查图像是否可用
    checkImageAvailability();
}

// 检查图像是否可用
function checkImageAvailability() {
    const testImage = new Image();
    testImage.onload = function() {
        useImageFallback = false;
    };
    testImage.onerror = function() {
        useImageFallback = true;
        console.log('图像资源不可用，将使用备用方案');
    };
    testImage.src = 'images/IQ-1.png';
}

// 开始测试
function startTest() {
    userName = userNameInput.value.trim();
    
    if (!userName) {
        alert('请输入您的姓名');
        return;
    }
    
    // 添加过渡效果
    introContainer.classList.add('fade-out');
    
    setTimeout(() => {
        introContainer.style.display = 'none';
        testContainer.style.display = 'block';
        resultsContainer.style.display = 'none';
        
        // 强制浏览器重绘
        setTimeout(() => {
            testContainer.classList.remove('fade-out');
        }, 10);
        
        currentQuestion = 0;
        userAnswers = new Array(allQuestions.length).fill(null);
        
        showQuestion(currentQuestion);
        updateProgressBar();
    }, 100);
}

// 重新开始测试
function restartTest() {
    // 添加过渡效果
    resultsContainer.classList.add('fade-out');
    
    setTimeout(() => {
        introContainer.style.display = 'block';
        testContainer.style.display = 'none';
        resultsContainer.style.display = 'none';
        
        // 强制浏览器重绘
        setTimeout(() => {
            introContainer.classList.remove('fade-out');
        }, 10);
    }, 300);
}

// 显示问题
function showQuestion(index) {
    const question = allQuestions[index];
    
    // 先移除原有内容
    questionContainer.innerHTML = '';
    
    if (useImageFallback) {
        // 创建备用问题显示
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-fallback';
        questionDiv.innerHTML = `
            <h3 style="text-align: center;">问题 ${question.id}</h3>
            <p style="text-align: center;">请根据模式选择正确的答案选项</p>
            <div class="fallback-question">
                <div class="fallback-matrix">
                    <div class="matrix-row">
                        <div class="matrix-cell">图形 1</div>
                        <div class="matrix-cell">图形 2</div>
                        <div class="matrix-cell">图形 3</div>
                    </div>
                    <div class="matrix-row">
                        <div class="matrix-cell">图形 4</div>
                        <div class="matrix-cell">图形 5</div>
                        <div class="matrix-cell">图形 6</div>
                    </div>
                    <div class="matrix-row">
                        <div class="matrix-cell">图形 7</div>
                        <div class="matrix-cell">图形 8</div>
                        <div class="matrix-cell question-mark">?</div>
                    </div>
                </div>
                <p style="text-align: center; margin-top: 15px;">请选择合适的图形填入问号处</p>
            </div>
        `;
        questionContainer.appendChild(questionDiv);
        
        // 创建备用选项容器
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        // 创建备用选项
        const tab = ["A", "B", "C", "D", "E", "F"]
        for (let i = 1; i <= question.options; i++) {
            const option = document.createElement('div');
            option.className = 'option fallback-option';
            if (userAnswers[index] === i) {
                option.classList.add('selected');
            }
            
            // 创建字母标签和选项文本
            const optionLabel = document.createElement('span');
            optionLabel.className = 'option-label';
            optionLabel.textContent = tab[i-1];
            
            const optionText = document.createElement('span');
            optionText.className = 'option-text';
            optionText.textContent = `选项 ${i}`;
            
            option.appendChild(optionLabel);
            option.appendChild(optionText);
            option.addEventListener('click', () => selectOption(index, i));
            
            optionsContainer.appendChild(option);
        }
        
        questionContainer.appendChild(optionsContainer);
    } else {
        // 创建问题图片
        const questionImg = document.createElement('img');
        questionImg.src = `images/${question.id}.png`;
        questionImg.alt = `问题 ${question.id}`;
        questionImg.className = 'question-image';
        
        // 创建选项容器
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        const tab = ["A", "B", "C", "D", "E", "F"]
        // 创建选项
        for (let i = 1; i <= question.options; i++) {
            const option = document.createElement('div');
            option.className = 'option';
            if (userAnswers[index] === i) {
                option.classList.add('selected');
            }
            
            // 添加字母标识
            const optionLabel = document.createElement('div');
            optionLabel.className = 'option-label';
            optionLabel.textContent = `${tab[i-1]}.`;
            
            const optionContent = document.createElement('div');
            optionContent.className = 'option-content';
            
            const optionImg = document.createElement('img');
            optionImg.src = `images/${question.id}-${tab[i-1]}.png`;
            optionImg.alt = `选项 ${i}`;
            
            optionContent.appendChild(optionImg);
            option.appendChild(optionLabel);
            option.appendChild(optionContent);
            option.addEventListener('click', () => selectOption(index, i));
            
            optionsContainer.appendChild(option);
        }
        
        questionContainer.appendChild(questionImg);
        questionContainer.appendChild(optionsContainer);
    }
    
    // 添加渐变过渡效果
    questionContainer.style.display = 'block';
    
    // 使用setTimeout使过渡效果生效
    setTimeout(() => {
        questionContainer.classList.add('active');
    }, 10);
    
    // 更新导航按钮状态
    updateNavigationButtons();
    
    // 更新进度
    currentQuestionEl.textContent = index + 1;
    updateProgressBar();
}

// 选择选项
function selectOption(questionIndex, optionIndex) {
    userAnswers[questionIndex] = optionIndex;
    
    // 更新选项样式
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        if (index === optionIndex - 1) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    // 自动前进到下一题（如果不是最后一题）
    if (questionIndex < allQuestions.length - 1) {
        setTimeout(() => {
            // 先移除active类，触发过渡效果
            questionContainer.classList.remove('active');
            
            // 等待过渡结束后切换问题
            setTimeout(() => {
                goToNextQuestion();
            }, 50);
        }, 100);
    }
}

// 前往上一题
function goToPrevQuestion() {
    if (currentQuestion > 0) {
        // 先移除active类，触发过渡效果
        questionContainer.classList.remove('active');
        
        // 等待过渡结束后切换问题
        setTimeout(() => {
            currentQuestion--;
            showQuestion(currentQuestion);
        }, 150);
    }
}

// 前往下一题
function goToNextQuestion() {
    if (currentQuestion < allQuestions.length - 1) {
        // 先移除active类，触发过渡效果
        questionContainer.classList.remove('active');
        
        // 等待过渡结束后切换问题
        setTimeout(() => {
            currentQuestion++;
            showQuestion(currentQuestion);
        }, 150);
    } else {
        // 如果是最后一题，显示结果
        questionContainer.classList.remove('active');
        setTimeout(() => {
            showResults();
        }, 150);
    }
}

// 更新进度条
function updateProgressBar() {
    const progress = ((currentQuestion + 1) / allQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// 更新导航按钮状态
function updateNavigationButtons() {
    prevBtn.disabled = currentQuestion === 0;
    
    if (currentQuestion === allQuestions.length - 1) {
        nextBtn.textContent = '完成测试';
    } else {
        nextBtn.textContent = '下一题';
    }
}

// 显示测试结果
function showResults() {
    // 添加过渡效果
    testContainer.classList.add('fade-out');
    
    setTimeout(() => {
        // 隐藏测试界面，显示结果界面
        testContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
        
        // 强制浏览器重绘
        setTimeout(() => {
            resultsContainer.classList.remove('fade-out');
        }, 10);
        
        // 计算正确答案数量
        const results = calculateResults();
        
        // 评估智力水平
        const evaluation = evaluatePerformance(results.totalCorrect);
        
        // 创建JSON格式的结果数据
        const resultsJson = {
            userName: userName,
            totalQuestions: allQuestions.length,
            totalCorrect: results.totalCorrect,
            score: results.totalCorrect,
            evaluationLevel: evaluation,
            setResults: {
                setA: {
                    correct: results.setA,
                    percent: Math.round((results.setA / 12) * 100)
                },
                setB: {
                    correct: results.setB,
                    percent: Math.round((results.setB / 12) * 100)
                },
                setC: {
                    correct: results.setC,
                    percent: Math.round((results.setC / 12) * 100)
                },
                setD: {
                    correct: results.setD,
                    percent: Math.round((results.setD / 12) * 100)
                },
                setE: {
                    correct: results.setE,
                    percent: Math.round((results.setE / 12) * 100)
                }
            }
        };
        
        // 输出JSON格式的日志
        console.log('测试结果JSON:', JSON.stringify(resultsJson, null, 2));
        
        // 更新结果 UI
        document.getElementById('user-name-display').textContent = userName;
        document.getElementById('total-completed').textContent = allQuestions.length;
        document.getElementById('correct-answers').textContent = results.totalCorrect;
        document.getElementById('score').textContent = results.totalCorrect;
        
        document.getElementById('evaluation-level').textContent = evaluation;
        
        // 更新各组得分
        document.getElementById('setA-correct').textContent = results.setA;
        document.getElementById('setA-percent').textContent = Math.round((results.setA / 12) * 100) + '%';
        
        document.getElementById('setB-correct').textContent = results.setB;
        document.getElementById('setB-percent').textContent = Math.round((results.setB / 12) * 100) + '%';
        
        document.getElementById('setC-correct').textContent = results.setC;
        document.getElementById('setC-percent').textContent = Math.round((results.setC / 12) * 100) + '%';
        
        document.getElementById('setD-correct').textContent = results.setD;
        document.getElementById('setD-percent').textContent = Math.round((results.setD / 12) * 100) + '%';
        
        document.getElementById('setE-correct').textContent = results.setE;
        document.getElementById('setE-percent').textContent = Math.round((results.setE / 12) * 100) + '%';
    }, 300);
}

// 计算测试结果
function calculateResults() {
    let setA = 0, setB = 0, setC = 0, setD = 0, setE = 0;
    
    // 计算各组的正确答案数
    for (let i = 0; i < allQuestions.length; i++) {
        const question = allQuestions[i];
        const userAnswer = userAnswers[i];
        
        if (userAnswer === question.answer) {
            if (i < 12) setA++;
            else if (i < 24) setB++;
            else if (i < 36) setC++;
            else if (i < 48) setD++;
            else setE++;
        }
    }
    
    const totalCorrect = setA + setB + setC + setD + setE;
    
    return {
        setA,
        setB,
        setC,
        setD,
        setE,
        totalCorrect
    };
}

// 评估智力水平
function evaluatePerformance(score) {
    // 确定评估等级
    let level = '';
    for (const evalLevel of evaluationLevels) {
        if (score >= evalLevel.min) {
            level = evalLevel.label;
            break;
        }
    }
    
    return level;
}

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    init();
    
    // 初始时为所有容器添加fade-out类
    testContainer.classList.add('fade-out');
    resultsContainer.classList.add('fade-out');
}); 