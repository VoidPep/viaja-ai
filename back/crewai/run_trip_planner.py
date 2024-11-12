import sys
import json
from main import main_function  # Ajuste o import para o ponto de entrada do CrewAI

def run_trip_planner():
    user_preferences = sys.argv[1]  # Recebe as preferências em JSON como argumento
    preferences = json.loads(user_preferences)  # Converte para um dicionário Python

    # Executa a função principal do CrewAI
    itinerary = main_function(preferences)
    print(json.dumps(itinerary))  # Retorna o itinerário em JSON

if __name__ == "__main__":
    run_trip_planner()
