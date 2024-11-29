from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class Accordion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    content = db.Column(db.Text, nullable=False)


with app.app_context():
    db.create_all()


@app.route('/api/accordion', methods=['POST'])
def save_accordion():
    data = request.json
    new_item = Accordion(title=data['title'], content=data['content'])
    db.session.add(new_item)
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Accordion saved!'})


@app.route('/api/accordion', methods=['GET'])
def get_accordions():
    accordions = Accordion.query.all()
    return jsonify([{'id': a.id, 'title': a.title, 'content': a.content} for a in accordions])


@app.route('/')
@app.route('/home')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/display')
def display():
    return render_template('display.html')

if __name__ == '__main__':
    app.run(debug=True)
