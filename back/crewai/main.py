import sys
from crewai import Crew
from textwrap import dedent
from trip_agents import TripAgents
from trip_tasks import TripTasks
from dotenv import load_dotenv

load_dotenv()

class TripCrew:
    def __init__(self, origin, date_range, interests):
        self.origin = origin
        self.interests = interests
        self.date_range = date_range

    def run(self):
        agents = TripAgents()
        tasks = TripTasks()

        city_selector_agent = agents.city_selection_agent()
        local_expert_agent = agents.local_expert()
        travel_concierge_agent = agents.travel_concierge()

        identify_task = tasks.identify_task(
            city_selector_agent,
            self.origin,
            self.interests,
            self.date_range
        )
        gather_task = tasks.gather_task(
            local_expert_agent,
            self.origin,
            self.interests,
            self.date_range
        )
        plan_task = tasks.plan_task(
            travel_concierge_agent, 
            self.origin,
            self.interests,
            self.date_range
        )

        crew = Crew(
            agents=[
                city_selector_agent, local_expert_agent, travel_concierge_agent
            ],
            tasks=[identify_task, gather_task, plan_task],
            verbose=True
        )

        result = crew.kickoff()
        return result


if __name__ == "__main__":
    location = sys.argv[1]
    date_range = sys.argv[2]
    interests = sys.argv[3]

    print("TESTE")

    # trip_crew = TripCrew(location, date_range, interests)
    # result = trip_crew.run()
    # print("\n".join(result))
