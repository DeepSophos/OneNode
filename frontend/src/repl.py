import os

def replace_in_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.svelte'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                new_content = content.replace('WEBUI_API_BASE_URL', 'ONENODE_API_BASE_URL')
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Replaced in: {file_path}")

# Run the replacement in the current directory
replace_in_files('.')