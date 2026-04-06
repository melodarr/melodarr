#!/usr/bin/env python3
import os
import re

root_dir = '/Users/jasonwalker/Development/Melodarr/melodarr'

dirs_to_rename = [
    ('src/Lidarr.Api.V1', 'src/Melodarr.Api.V1'),
    ('src/Lidarr.Http', 'src/Melodarr.Http')
]

for old_dir, new_dir in dirs_to_rename:
    old_path = os.path.join(root_dir, old_dir)
    new_path = os.path.join(root_dir, new_dir)
    if os.path.isdir(old_path):
        os.rename(old_path, new_path)
        print(f"Renamed dir {old_dir} to {new_dir}")

for root, dirs, files in os.walk(root_dir):
    if '.git' in root or 'node_modules' in root:
        continue
    for file in files:
        if file.endswith('.sln') or file.endswith('.csproj'):
            if 'Lidarr' in file:
                old_file = os.path.join(root, file)
                new_file = os.path.join(root, file.replace('Lidarr', 'Melodarr'))
                os.rename(old_file, new_file)
                print(f"Renamed file {file}")

allowed_extensions = {'.cs', '.csproj', '.sln', '.runsettings', '.sh', '.yml', '.yaml', '.props', '.conf'}

replacements = [
    (r'\bLidarr\.Api\.V1\b', 'Melodarr.Api.V1'),
    (r'\bLidarr\.Http\b', 'Melodarr.Http'),
    (r'\bLidarr\.(Core|Host|Console|Libraries|Automation|Api|Test|Common|Integration|Update|Windows|Mono|SignalR|SysTray)(\.[a-zA-Z]+)?\.csproj\b', r'Melodarr.\1\2.csproj'),
    (r'\bLidarr\.csproj\b', 'Melodarr.csproj'),
    (r'\bLidarr\.sln\b', 'Melodarr.sln'),
    (r'^namespace Lidarr', 'namespace Melodarr'),
    (r'^using Lidarr', 'using Melodarr'),
    (r'namespace Lidarr\.', 'namespace Melodarr.'),
    (r'using Lidarr\.', 'using Melodarr.'),
    (r'<RootNamespace>Lidarr', '<RootNamespace>Melodarr'),
    (r'<AssemblyName>Lidarr', '<AssemblyName>Melodarr'),
    (r'<Title>Lidarr\b', '<Title>Melodarr'),
]

compiled_replacements = [(re.compile(pattern, re.MULTILINE), repl) for pattern, repl in replacements]

for root, dirs, files in os.walk(root_dir):
    if '.git' in root or 'node_modules' in root or 'obj' in root or 'bin' in root or '_output' in root:
        continue
    for file in files:
        if not any(file.endswith(ext) for ext in allowed_extensions):
            continue
            
        file_path = os.path.join(root, file)
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except UnicodeDecodeError:
            continue
            
        original_content = content
        
        for pattern, repl in compiled_replacements:
            content = pattern.sub(repl, content)
            
        if file.endswith('.sln'):
            content = re.sub(r' = "Lidarr",', r' = "Melodarr",', content)
            content = re.sub(r' = "Lidarr\.([A-Za-z0-9\.]+)",', r' = "Melodarr.\1",', content)
            content = re.sub(r'\\Lidarr\.([A-Za-z0-9\.]+)\.csproj', r'\\Melodarr.\1.csproj', content)
            content = re.sub(r'\\Lidarr\.csproj', r'\\Melodarr.csproj', content)

        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {file_path}")

print("Done")
