"""
Скрипт для разбиения index_typo.html на отдельные страницы
"""

from pathlib import Path
import re

def split_pages():
    # Читаем основной файл
    with open('index_typo.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Извлекаем head
    head_match = re.search(r'<head>(.*?)</head>', content, re.DOTALL)
    head_content = head_match.group(1) if head_match else ''
    
    # Находим все страницы
    pages = re.findall(r'<!-- ===== СТРАНИЦА \d+:.*?===== -->\s*<div class="page.*?</div>\s*(?=<!-- ===== СТРАНИЦА|</body>)', content, re.DOTALL)
    
    print(f"Найдено страниц: {len(pages)}")
    
    # Создаём директорию pages если её нет
    Path('pages').mkdir(exist_ok=True)
    
    # Названия файлов
    page_names = [
        'page_01_cover.html',
        'page_02_contents.html',
        'page_03_intro.html',
        'page_04_hospitality.html',
        'page_05_theory.html',
        'page_06_behavior.html',
        'page_07_nonverbal.html',
        'page_08_service.html',
        'page_09_requests.html',
        'page_10_details.html',
        'page_11_events.html',
        'page_12_about.html',
        'page_13_principles.html',
        'page_14_interaction.html',
        'page_15_sanitary.html',
        'page_16_situations.html',
        'page_17_reactions.html',
        'page_18_blast.html',
        'page_19_types.html',
        'page_20_regulation.html',
        'page_21_code.html',
        'page_22_teamwork.html',
        'page_23_conclusion.html',
    ]
    
    # Сохраняем каждую страницу
    for i, page in enumerate(pages):
        filename = page_names[i] if i < len(page_names) else f'page_{i+1:02d}.html'
        
        # Создаём полный HTML
        full_html = f'''<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Страница {i+1} — Сервис-бук</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../style.css">
  
  <!-- Phosphor Icons -->
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  
  <!-- Hyphenopoly для правильных переносов -->
  <script src="https://cdn.jsdelivr.net/npm/hyphenopoly@4.x/hyphenopoly.js"></script>
  <script>
    Hyphenopoly.config({{
      locale: 'ru',
      minWordLength: 6,
      leftmin: 3,
      rightmin: 3,
    }});
  </script>
</head>
<body>

{page}

</body>
</html>'''
        
        # Сохраняем файл
        with open(f'pages/{filename}', 'w', encoding='utf-8') as f:
            f.write(full_html)
        
        print(f"✓ Создан {filename}")
    
    print(f"\n✅ Успешно создано {len(pages)} страниц!")

if __name__ == '__main__':
    split_pages()
