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
    "keyCombo": "Cmd + C",
    "description": "복사 (Copy)",
    "category": "Editing"
  },
  {
    "id": 6,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + C",
    "description": "복사 (Copy)",
    "category": "Editing"
  },
  {
    "id": 7,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + V",
    "description": "붙여넣기 (Paste)",
    "category": "Editing"
  },
  {
    "id": 8,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + V",
    "description": "붙여넣기 (Paste)",
    "category": "Editing"
  },
  {
    "id": 9,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + X",
    "description": "잘라내기 (Cut)",
    "category": "Editing"
  },
  {
    "id": 10,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + X",
    "description": "잘라내기 (Cut)",
    "category": "Editing"
  },
  {
    "id": 11,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + A",
    "description": "전체 선택 (Select All)",
    "category": "Selection"
  },
  {
    "id": 12,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + A",
    "description": "전체 선택 (Select All)",
    "category": "Selection"
  },
  {
    "id": 13,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + D",
    "description": "선택 해제 (Deselect)",
    "category": "Selection"
  },
  {
    "id": 14,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + D",
    "description": "선택 해제 (Deselect)",
    "category": "Selection"
  },
  {
    "id": 15,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + J",
    "description": "레이어 복제 (Duplicate Layer)",
    "category": "Layers"
  },
  {
    "id": 16,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + J",
    "description": "레이어 복제 (Duplicate Layer)",
    "category": "Layers"
  },
  {
    "id": 17,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + Shift + N",
    "description": "새 레이어 (New Layer)",
    "category": "Layers"
  },
  {
    "id": 18,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + Shift + N",
    "description": "새 레이어 (New Layer)",
    "category": "Layers"
  },
  {
    "id": 19,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + E",
    "description": "레이어 병합 (Merge Down)",
    "category": "Layers"
  },
  {
    "id": 20,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + E",
    "description": "레이어 병합 (Merge Down)",
    "category": "Layers"
  },
  {
    "id": 21,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + G",
    "description": "레이어 그룹화 (Group Layers)",
    "category": "Layers"
  },
  {
    "id": 22,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + G",
    "description": "레이어 그룹화 (Group Layers)",
    "category": "Layers"
  },
  {
    "id": 23,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + T",
    "description": "자유 변형 (Free Transform)",
    "category": "Transform"
  },
  {
    "id": 24,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + T",
    "description": "자유 변형 (Free Transform)",
    "category": "Transform"
  },
  {
    "id": 25,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + +",
    "description": "확대 (Zoom In)",
    "category": "View"
  },
  {
    "id": 26,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + +",
    "description": "확대 (Zoom In)",
    "category": "View"
  },
  {
    "id": 27,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + -",
    "description": "축소 (Zoom Out)",
    "category": "View"
  },
  {
    "id": 28,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + -",
    "description": "축소 (Zoom Out)",
    "category": "View"
  },
  {
    "id": 29,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + 0",
    "description": "화면에 맞춤 (Fit on Screen)",
    "category": "View"
  },
  {
    "id": 30,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + 0",
    "description": "화면에 맞춤 (Fit on Screen)",
    "category": "View"
  },
  {
    "id": 31,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Cmd + 1",
    "description": "실제 크기 (Actual Size)",
    "category": "View"
  },
  {
    "id": 32,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Ctrl + 1",
    "description": "실제 크기 (Actual Size)",
    "category": "View"
  },
  {
    "id": 33,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "B",
    "description": "브러시 도구 (Brush Tool)",
    "category": "Tools"
  },
  {
    "id": 34,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "B",
    "description": "브러시 도구 (Brush Tool)",
    "category": "Tools"
  },
  {
    "id": 35,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "E",
    "description": "지우개 도구 (Eraser Tool)",
    "category": "Tools"
  },
  {
    "id": 36,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "E",
    "description": "지우개 도구 (Eraser Tool)",
    "category": "Tools"
  },
  {
    "id": 37,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "M",
    "description": "선택 도구 (Marquee Tool)",
    "category": "Tools"
  },
  {
    "id": 38,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "M",
    "description": "선택 도구 (Marquee Tool)",
    "category": "Tools"
  },
  {
    "id": 39,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "V",
    "description": "이동 도구 (Move Tool)",
    "category": "Tools"
  },
  {
    "id": 40,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "V",
    "description": "이동 도구 (Move Tool)",
    "category": "Tools"
  },
  {
    "id": 41,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "L",
    "description": "올가미 도구 (Lasso Tool)",
    "category": "Tools"
  },
  {
    "id": 42,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "L",
    "description": "올가미 도구 (Lasso Tool)",
    "category": "Tools"
  },
  {
    "id": 43,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "W",
    "description": "마술봉 도구 (Magic Wand Tool)",
    "category": "Tools"
  },
  {
    "id": 44,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "W",
    "description": "마술봉 도구 (Magic Wand Tool)",
    "category": "Tools"
  },
  {
    "id": 45,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "I",
    "description": "스포이드 도구 (Eyedropper Tool)",
    "category": "Tools"
  },
  {
    "id": 46,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "I",
    "description": "스포이드 도구 (Eyedropper Tool)",
    "category": "Tools"
  },
  {
    "id": 47,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "H",
    "description": "손바닥 도구 (Hand Tool)",
    "category": "Tools"
  },
  {
    "id": 48,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "H",
    "description": "손바닥 도구 (Hand Tool)",
    "category": "Tools"
  },
  {
    "id": 49,
    "tool": "Photoshop",
    "platform": "Mac",
    "keyCombo": "Z",
    "description": "확대/축소 도구 (Zoom Tool)",
    "category": "Tools"
  },
  {
    "id": 50,
    "tool": "Photoshop",
    "platform": "Windows",
    "keyCombo": "Z",
    "description": "확대/축소 도구 (Zoom Tool)",
    "category": "Tools"
  }
];

const filePath = "c:\\Users\\hmkin\\OneDrive\\바탕 화면\\shortcut-vault-app-2\\src\\data\\photoshop.json";

try {
  const jsonString = JSON.stringify(photoshopData, null, 2);
  fs.writeFileSync(filePath, jsonString, { encoding: 'utf8' });
  console.log('✅ Photoshop JSON 파일이 성공적으로 생성되었습니다!');
  console.log(`📊 총 ${photoshopData.length}개의 단축키가 포함되었습니다.`);
  console.log(`📁 파일 위치: ${filePath}`);
} catch (error) {
  console.error('❌ 파일 생성 중 오류가 발생했습니다:', error);
}
