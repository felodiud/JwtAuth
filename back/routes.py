from flask import  request, jsonify, url_for, Blueprint, Flask
from models import db, User
from utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required 




from flask_jwt_extended import create_access_token, JWTManager

api = Blueprint('api', __name__)

@api.route("/login", methods=["POST"])
def login():
    loginUser = request.get_json()
    if not loginUser or "email" not in loginUser or "password" not in loginUser:
        return jsonify({
            "msg": "Missing email or password"
        }), 400

    email = loginUser["email"]
    password = loginUser["password"]
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({
            "msg": "Bad username or password"
        }), 401
    if password != user.password:
        return jsonify({
            "msg": "Bad username or password"
        }), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200
# 
@api.route("/signup", methods=["POST"])
def signup():

    data = request.get_json()
    if not data or "email" not in data or "password" not in data or "active" not in data or "confirmPass" not in data:
        return jsonify({
            "msg": "Missing email or password"
        }), 400
    

    email = data["email"]

    existingUser = User.query.filter_by(email=email).first()
    if existingUser: 
        return jsonify ({
            "msg": "User already exists"
        })
    
    user = User()
    user.email = data["email"]
    user.password = data["password"]
    user.is_active = data["active"]
    confirmPass = data["confirmPass"]
    password = data["password"]
    if password != confirmPass:
        return jsonify ({
            "msg": "Passwords must be same"
        }), 401

    db.session.add(user);
    db.session.commit();5
    return jsonify({
        "msg": "User created"
    })



@api.route('/hello', methods=['GET'])
@jwt_required()
def handle_create_token():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

