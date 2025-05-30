import json
import os

# VSCode 단축키 설명 번역 사전
translations = {
    "Quick open file": "빠른 파일 열기 (Quick open file)",
    "Command palette": "명령 팔레트 (Command palette)",
    "Toggle line comment": "줄 주석 토글 (Toggle line comment)",
    "Toggle block comment": "블록 주석 토글 (Toggle block comment)",
    "Save file": "파일 저장 (Save file)",
    "Save all files": "모든 파일 저장 (Save all files)",
    "Undo": "실행 취소 (Undo)",
    "Redo": "다시 실행 (Redo)",
    "Cut line": "줄 잘라내기 (Cut line)",
    "Copy line": "줄 복사 (Copy line)",
    "Delete line": "줄 삭제 (Delete line)",
    "Move line up": "줄 위로 이동 (Move line up)",
    "Move line down": "줄 아래로 이동 (Move line down)",
    "Copy line up": "줄 위로 복사 (Copy line up)",
    "Copy line down": "줄 아래로 복사 (Copy line down)",
    "Indent line": "줄 들여쓰기 (Indent line)",
    "Outdent line": "줄 내어쓰기 (Outdent line)",
    "Go to line": "줄로 이동 (Go to line)",
    "Find": "찾기 (Find)",
    "Find and replace": "찾기 및 바꾸기 (Find and replace)",
    "Find next": "다음 찾기 (Find next)",
    "Find previous": "이전 찾기 (Find previous)",
    "Select all": "모두 선택 (Select all)",
    "Select line": "줄 선택 (Select line)",
    "Select word": "단어 선택 (Select word)",
    "Expand selection": "선택 확장 (Expand selection)",
    "Shrink selection": "선택 축소 (Shrink selection)",
    "Add cursor above": "위에 커서 추가 (Add cursor above)",
    "Add cursor below": "아래에 커서 추가 (Add cursor below)",
    "Add cursor to line ends": "줄 끝에 커서 추가 (Add cursor to line ends)",
    "Select all occurrences": "모든 일치 항목 선택 (Select all occurrences)",
    "Go to definition": "정의로 이동 (Go to definition)",
    "Peek definition": "정의 미리보기 (Peek definition)",
    "Go to references": "참조로 이동 (Go to references)",
    "Rename symbol": "기호 이름 바꾸기 (Rename symbol)",
    "Format document": "문서 서식 지정 (Format document)",
    "Format selection": "선택 영역 서식 지정 (Format selection)",
    "Show hover": "호버 표시 (Show hover)",
    "Trigger suggestion": "제안 트리거 (Trigger suggestion)",
    "Trigger parameter hints": "매개변수 힌트 트리거 (Trigger parameter hints)",
    "Open file": "파일 열기 (Open file)",
    "New file": "새 파일 (New file)",
    "Close file": "파일 닫기 (Close file)",
    "Close all files": "모든 파일 닫기 (Close all files)",
    "Reopen closed file": "닫힌 파일 다시 열기 (Reopen closed file)",
    "Switch to next tab": "다음 탭으로 전환 (Switch to next tab)",
    "Switch to previous tab": "이전 탭으로 전환 (Switch to previous tab)",
    "Go to tab": "탭으로 이동 (Go to tab)",
    "Split editor": "편집기 분할 (Split editor)",
    "Split editor vertically": "편집기 세로 분할 (Split editor vertically)",
    "Split editor horizontally": "편집기 가로 분할 (Split editor horizontally)",
    "Close split": "분할 닫기 (Close split)",
    "Switch split": "분할 전환 (Switch split)",
    "Toggle sidebar": "사이드바 토글 (Toggle sidebar)",
    "Toggle panel": "패널 토글 (Toggle panel)",
    "Toggle terminal": "터미널 토글 (Toggle terminal)",
    "Toggle problems": "문제 토글 (Toggle problems)",
    "Toggle output": "출력 토글 (Toggle output)",
    "Toggle debug console": "디버그 콘솔 토글 (Toggle debug console)",
    "Show explorer": "탐색기 표시 (Show explorer)",
    "Show search": "검색 표시 (Show search)",
    "Show source control": "소스 제어 표시 (Show source control)",
    "Show debug": "디버그 표시 (Show debug)",
    "Show extensions": "확장 표시 (Show extensions)",
    "Zoom in": "확대 (Zoom in)",
    "Zoom out": "축소 (Zoom out)",
    "Reset zoom": "확대/축소 재설정 (Reset zoom)",
    "Toggle full screen": "전체 화면 토글 (Toggle full screen)",
    "Open settings": "설정 열기 (Open settings)",
    "Open keyboard shortcuts": "키보드 단축키 열기 (Open keyboard shortcuts)",
    "Show command palette": "명령 팔레트 표시 (Show command palette)",
    "Start debugging": "디버깅 시작 (Start debugging)",
    "Stop debugging": "디버깅 중지 (Stop debugging)",
    "Step over": "단계별 실행 (Step over)",
    "Step into": "단계별 들어가기 (Step into)",
    "Step out": "단계별 나가기 (Step out)",
    "Continue": "계속 (Continue)",
    "Toggle breakpoint": "중단점 토글 (Toggle breakpoint)",
    "Open integrated terminal": "통합 터미널 열기 (Open integrated terminal)",
    "Create new terminal": "새 터미널 만들기 (Create new terminal)",
    "Kill terminal": "터미널 종료 (Kill terminal)",
    "Clear terminal": "터미널 지우기 (Clear terminal)",
    "Open folder": "폴더 열기 (Open folder)",
    "Close folder": "폴더 닫기 (Close folder)",
    "Add folder to workspace": "작업 영역에 폴더 추가 (Add folder to workspace)",
    "Save workspace": "작업 영역 저장 (Save workspace)",
    "Open workspace": "작업 영역 열기 (Open workspace)",
    "Find in files": "파일에서 찾기 (Find in files)",
    "Replace in files": "파일에서 바꾸기 (Replace in files)",
    "Toggle word wrap": "줄 바꿈 토글 (Toggle word wrap)",
    "Toggle minimap": "미니맵 토글 (Toggle minimap)",
    "Go to matching bracket": "일치하는 괄호로 이동 (Go to matching bracket)",
    "Jump to matching bracket": "일치하는 괄호로 점프 (Jump to matching bracket)",
    "Select to matching bracket": "일치하는 괄호까지 선택 (Select to matching bracket)",
    "Fold": "접기 (Fold)",
    "Unfold": "펼치기 (Unfold)",
    "Fold all": "모두 접기 (Fold all)",
    "Unfold all": "모두 펼치기 (Unfold all)",
    "Toggle fold": "접기 토글 (Toggle fold)",
    "Go to symbol": "기호로 이동 (Go to symbol)",
    "Go to symbol in workspace": "작업 영역에서 기호로 이동 (Go to symbol in workspace)",
    "Quick fix": "빠른 수정 (Quick fix)",
    "Show all problems": "모든 문제 표시 (Show all problems)",
    "Go to next problem": "다음 문제로 이동 (Go to next problem)",
    "Go to previous problem": "이전 문제로 이동 (Go to previous problem)",
    "Insert line above": "위에 줄 삽입 (Insert line above)",
    "Insert line below": "아래에 줄 삽입 (Insert line below)",
    "Join lines": "줄 결합 (Join lines)",
    "Transform to uppercase": "대문자로 변환 (Transform to uppercase)",
    "Transform to lowercase": "소문자로 변환 (Transform to lowercase)",
    "Sort lines ascending": "줄 오름차순 정렬 (Sort lines ascending)",
    "Sort lines descending": "줄 내림차순 정렬 (Sort lines descending)",
    "Toggle tab moves focus": "탭으로 포커스 이동 토글 (Toggle tab moves focus)",
    "Navigate back": "뒤로 이동 (Navigate back)",
    "Navigate forward": "앞으로 이동 (Navigate forward)",
    "Go to last edit location": "마지막 편집 위치로 이동 (Go to last edit location)",
    "Show outline": "개요 표시 (Show outline)",
    "Show timeline": "타임라인 표시 (Show timeline)",
    "Toggle breadcrumbs": "브레드크럼 토글 (Toggle breadcrumbs)",
    "Reveal in explorer": "탐색기에서 표시 (Reveal in explorer)",
    "Copy path": "경로 복사 (Copy path)",
    "Copy relative path": "상대 경로 복사 (Copy relative path)",
    "Duplicate file": "파일 복제 (Duplicate file)",
    "Rename file": "파일 이름 바꾸기 (Rename file)",
    "Delete file": "파일 삭제 (Delete file)",
    "New folder": "새 폴더 (New folder)",
    "Collapse folders": "폴더 접기 (Collapse folders)",
    "Refresh": "새로 고침 (Refresh)"
}

def update_vscode_descriptions():
    file_path = r"c:\Users\hmkin\OneDrive\바탕 화면\shortcut-vault-app-2\src\data\vscode.json"
    
    # JSON 파일 읽기
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # 각 항목의 description 업데이트
    updated_count = 0
    for item in data:
        original_desc = item.get('description', '')
        if original_desc in translations:
            item['description'] = translations[original_desc]
            updated_count += 1
        elif not ' (' in original_desc:  # 이미 번역되지 않은 항목들
            # 기본 번역 패턴 적용
            korean_desc = f"{original_desc} ({original_desc})"
            item['description'] = korean_desc
            updated_count += 1
    
    # 백업 파일 생성
    backup_path = file_path.replace('.json', '-backup.json')
    with open(backup_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    # 업데이트된 파일 저장
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"VSCode 파일 업데이트 완료: {updated_count}개 항목 업데이트됨")
    print(f"백업 파일: {backup_path}")

if __name__ == "__main__":
    update_vscode_descriptions()
