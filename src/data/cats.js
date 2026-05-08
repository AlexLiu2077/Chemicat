import { getAssetUrl } from '../utils/assetUrl';

const cats = [
  {
    id: 'black_1',
    name: '小煤球',
    image: getAssetUrl('/assets/cats/black_1.jpg'),
    description: '多动的孟买猫，仿佛永远处于过载状态，精力极度充沛，实验室里的每个角落都留下了它的破坏痕迹',
  },
  {
    id: 'black_2',
    name: '小煤球——炼金术士',
    image: getAssetUrl('/assets/cats/black_2.jpg'),
    description: '小煤球讨厌普通的化学实验，而喜欢研究那些古老的炼金魔法，身上挂着各种神秘的符咒和小瓶子，仿佛随时准备施展一场惊人的炼金术！',
  },
  {
    id: 'orange_1',
    name: '小橘子',
    image: getAssetUrl('/assets/cats/orange_1.jpg'),
    description: '活泼开朗的小橘猫，总是充满活力，用满满的热情鼓励你完成每天的学习目标！',
  },
  {
    id: 'orange_2',
    name: '小橘子——化学实验',
    image: getAssetUrl('/assets/cats/orange_2.jpg'),
    description: '在一次偶然的机会下，小橘子潜入了一个神秘的科学实验室。被那些五颜六色的液体和奇形怪状的仪器所吸引，它决定展开一场关于"化学"的好奇心大冒险。',
  },
  {
    id: 'white_1',
    name: '小泡芙',
    image: getAssetUrl('/assets/cats/white_1.jpg'),
    description: '蓝眼睛的白色波斯猫，温柔又有耐心，会在你遇到困难时给你最温暖的鼓励。',
  },
  {
    id: 'white_2',
    name: '小泡芙——稀有气体',
    image: getAssetUrl('/assets/cats/white_2.jpg'),
    description: '小泡芙打翻了几个霓虹灯管，这些神秘的气体让它学会了光的魔法，现在它是个闪闪发光的小猫咪！',
  },
];

export default cats;
