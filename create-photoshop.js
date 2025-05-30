const fs = require('fs');

const photoshopData = [
  {
    "id": 1,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + Z",
    "description": "실행 취소 (Undo)",
    "category": "Editing"
  },
  {
    "id": 2,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + Z",
    "description": "실행 취소 (Undo)",
    "category": "Editing"
  },
  {
    "id": 3,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + Shift + Z",
    "description": "다시 실행 (Redo)",
    "category": "Editing"
  },
  {
    "id": 4,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + Y",
    "description": "다시 실행 (Redo)",
    "category": "Editing"
  },
  {
    "id": 5,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + N",
    "description": "새 문서 (New document)",
    "category": "File"
  },
  {
    "id": 6,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + N",
    "description": "새 문서 (New document)",
    "category": "File"
  },
  {
    "id": 7,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + O",
    "description": "파일 열기 (Open file)",
    "category": "File"
  },
  {
    "id": 8,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + O",
    "description": "파일 열기 (Open file)",
    "category": "File"
  },
  {
    "id": 9,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + S",
    "description": "저장 (Save)",
    "category": "File"
  },
  {
    "id": 10,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + S",
    "description": "저장 (Save)",
    "category": "File"
  },
  {
    "id": 11,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + Shift + S",
    "description": "다른 이름으로 저장 (Save As)",
    "category": "File"
  },
  {
    "id": 12,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + Shift + S",
    "description": "다른 이름으로 저장 (Save As)",
    "category": "File"
  },
  {
    "id": 13,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + C",
    "description": "복사 (Copy)",
    "category": "Editing"
  },
  {
    "id": 14,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + C",
    "description": "복사 (Copy)",
    "category": "Editing"
  },
  {
    "id": 15,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + V",
    "description": "붙여넣기 (Paste)",
    "category": "Editing"
  },
  {
    "id": 16,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + V",
    "description": "붙여넣기 (Paste)",
    "category": "Editing"
  },
  {
    "id": 17,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + X",
    "description": "잘라내기 (Cut)",
    "category": "Editing"
  },
  {
    "id": 18,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + X",
    "description": "잘라내기 (Cut)",
    "category": "Editing"
  },
  {
    "id": 19,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + A",
    "description": "모두 선택 (Select All)",
    "category": "Selection"
  },
  {
    "id": 20,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + A",
    "description": "모두 선택 (Select All)",
    "category": "Selection"
  },
  {
    "id": 21,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + D",
    "description": "선택 해제 (Deselect)",
    "category": "Selection"
  },
  {
    "id": 22,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + D",
    "description": "선택 해제 (Deselect)",
    "category": "Selection"
  },
  {
    "id": 23,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + J",
    "description": "레이어 복제 (Duplicate Layer)",
    "category": "Layers"
  },
  {
    "id": 24,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + J",
    "description": "레이어 복제 (Duplicate Layer)",
    "category": "Layers"
  },
  {
    "id": 25,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + Shift + N",
    "description": "새 레이어 (New Layer)",
    "category": "Layers"
  },
  {
    "id": 26,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + Shift + N",
    "description": "새 레이어 (New Layer)",
    "category": "Layers"
  },
  {
    "id": 27,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + E",
    "description": "아래 레이어와 병합 (Merge Down)",
    "category": "Layers"
  },
  {
    "id": 28,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + E",
    "description": "아래 레이어와 병합 (Merge Down)",
    "category": "Layers"
  },
  {
    "id": 29,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + G",
    "description": "레이어 그룹화 (Group Layers)",
    "category": "Layers"
  },
  {
    "id": 30,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + G",
    "description": "레이어 그룹화 (Group Layers)",
    "category": "Layers"
  },
  {
    "id": 31,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + Shift + G",
    "description": "레이어 그룹 해제 (Ungroup Layers)",
    "category": "Layers"
  },
  {
    "id": 32,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + Shift + G",
    "description": "레이어 그룹 해제 (Ungroup Layers)",
    "category": "Layers"
  },
  {
    "id": 33,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + T",
    "description": "자유 변형 (Free Transform)",
    "category": "Transform"
  },
  {
    "id": 34,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + T",
    "description": "자유 변형 (Free Transform)",
    "category": "Transform"
  },
  {
    "id": 35,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "V",
    "description": "이동 도구 (Move Tool)",
    "category": "Tools"
  },
  {
    "id": 36,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "V",
    "description": "이동 도구 (Move Tool)",
    "category": "Tools"
  },
  {
    "id": 37,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "B",
    "description": "브러시 도구 (Brush Tool)",
    "category": "Tools"
  },
  {
    "id": 38,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "B",
    "description": "브러시 도구 (Brush Tool)",
    "category": "Tools"
  },
  {
    "id": 39,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "E",
    "description": "지우개 도구 (Eraser Tool)",
    "category": "Tools"
  },
  {
    "id": 40,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "E",
    "description": "지우개 도구 (Eraser Tool)",
    "category": "Tools"
  },
  {
    "id": 41,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "M",
    "description": "선택 도구 (Marquee Tool)",
    "category": "Tools"
  },
  {
    "id": 42,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "M",
    "description": "선택 도구 (Marquee Tool)",
    "category": "Tools"
  },
  {
    "id": 43,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "L",
    "description": "올가미 도구 (Lasso Tool)",
    "category": "Tools"
  },
  {
    "id": 44,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "L",
    "description": "올가미 도구 (Lasso Tool)",
    "category": "Tools"
  },
  {
    "id": 45,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "W",
    "description": "마술봉 도구 (Magic Wand Tool)",
    "category": "Tools"
  },
  {
    "id": 46,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "W",
    "description": "마술봉 도구 (Magic Wand Tool)",
    "category": "Tools"
  },
  {
    "id": 47,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + Plus",
    "description": "확대 (Zoom In)",
    "category": "View"
  },
  {
    "id": 48,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + Plus",
    "description": "확대 (Zoom In)",
    "category": "View"
  },
  {
    "id": 49,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + 0",
    "description": "화면에 맞추기 (Fit on Screen)",
    "category": "View"
  },
  {
    "id": 50,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + 0",
    "description": "화면에 맞추기 (Fit on Screen)",
    "category": "View"
  }
];

fs.writeFileSync('./src/data/photoshop.json', JSON.stringify(photoshopData, null, 2), 'utf8');
console.log('Photoshop JSON file created successfully!');
