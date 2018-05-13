
import numpy as np
import sys
from sklearn.cluster import KMeans


np.set_printoptions(threshold=sys.maxsize)

np.random.seed(44)

keys = ['Name', 'Time', 'Rating']
night_life_attractions = []
historical_attractions = [] 
sport_attractions = [] 
nature_attractions = []

# toy data

night_life_attractions.append(dict(zip(keys, ["FreeStyler", 2, 4.2])))
night_life_attractions.append(dict(zip(keys, [ "River", 2, 4.0])))
night_life_attractions.append(dict(zip(keys, ["Shake Shake", 2, 4.1])))
night_life_attractions.append(dict(zip(keys, ["Trassa", 2, 3.9])))
night_life_attractions.append(dict(zip(keys, ["Square", 2, 3.8])))
night_life_attractions.append(dict(zip(keys, ["FreeStyler", 2, 3.2])))
night_life_attractions.append(dict(zip(keys, [ "River", 2, 3.0])))
night_life_attractions.append(dict(zip(keys, ["Shake Shake", 2, 3.1])))
night_life_attractions.append(dict(zip(keys, ["Trassa", 2, 2.9])))
night_life_attractions.append(dict(zip(keys, ["Square", 2, 2.8])))

historical_attractions.append(dict(zip(keys, ["Kalemegdan fortress", 3, 4.7])))
historical_attractions.append(dict(zip(keys, ["National museum", 5, 3.8])))
historical_attractions.append(dict(zip(keys, ["Hram Svetog Save", 2, 4.8])))
historical_attractions.append(dict(zip(keys, ["Skadarlija", 1, 4.5])))
historical_attractions.append(dict(zip(keys, ["National Assembly", 0.5, 3.6])))
historical_attractions.append(dict(zip(keys, ["Kalemegdan fortress", 3, 3.4])))
historical_attractions.append(dict(zip(keys, ["National museum", 5, 3.2])))
historical_attractions.append(dict(zip(keys, ["Hram Svetog Save", 2, 1.1])))
historical_attractions.append(dict(zip(keys, ["Skadarlija", 1, 2.5])))
historical_attractions.append(dict(zip(keys, ["National Assembly", 0.5, 3.0])))

sport_attractions.append(dict(zip(keys, ["Marakana", 1, 4.3])))
sport_attractions.append(dict(zip(keys, ["Pionir", 0.5, 3.9])))
sport_attractions.append(dict(zip(keys, ["Aleksandar Nikolic", 0.5, 3.7])))
sport_attractions.append(dict(zip(keys, ["JNA", 1, 4.1])))
sport_attractions.append(dict(zip(keys, ["Stadion tamo neki", 1, 2.7])))
sport_attractions.append(dict(zip(keys, ["Marakana", 1, 3.3])))
sport_attractions.append(dict(zip(keys, ["Pionir", 0.5, 2.9])))
sport_attractions.append(dict(zip(keys, ["Aleksandar Nikolic", 0.5, 2.7])))
sport_attractions.append(dict(zip(keys, ["JNA", 1, 4.1])))
sport_attractions.append(dict(zip(keys, ["Stadion tamo neki", 1, 2.7])))

nature_attractions.append(dict(zip(keys, ["Kalemegdan", 2, 4.8])))
nature_attractions.append(dict(zip(keys, ["Tasmajdan", 1.5, 3.8])))
nature_attractions.append(dict(zip(keys, ["Dunav", 1, 4.1])))
nature_attractions.append(dict(zip(keys, ["Sava", 1, 3.9])))
nature_attractions.append(dict(zip(keys, ["Ada", 1.5, 4.0])))
nature_attractions.append(dict(zip(keys, ["Kalemegdan", 2, 3.8])))
nature_attractions.append(dict(zip(keys, ["Tasmajdan", 1.5, 2.8])))
nature_attractions.append(dict(zip(keys, ["Dunav", 1, 3.1])))
nature_attractions.append(dict(zip(keys, ["Sava", 1, 2.9])))
nature_attractions.append(dict(zip(keys, ["Ada", 1.5, 3.0])))


# Random user data

X = np.empty(shape = [0, 4])

for i in range(100):
    X = np.append(X, [[0.0, 0.0, 0.0, 1.0]], axis = 0)
    X = np.append(X, [[0.0, 0.0, 1.0, 0.0]], axis = 0)
    X = np.append(X, [[0.0, 1.0, 0.0, 0.0]], axis = 0)
    X = np.append(X, [[1.0, 0.0, 0.0, 0.0]], axis = 0)
    X = np.append(X, [[0.5, 0.5, 0.0, 0.0]], axis = 0)
    X = np.append(X, [[0.0, 0.5, 0.5, 0.0]], axis = 0)
    X = np.append(X, [[0.0, 0.0, 0.5, 0.5]], axis = 0)
    X = np.append(X, [[0.5, 0.0, 0.0, 0.5]], axis = 0)
    X = np.append(X, [[0.0, 0.5, 0.0, 0.5]], axis = 0)
    X = np.append(X, [[0.5, 0.0, 0.5, 0.0]], axis = 0)
    
    
for i in range(1000):
    night_life = np.random.random()
    historical = np.random.random()
    nature = np.random.random()
    sport = np.random.random()
       
    s = night_life + historical + nature + sport
    
    night_life /= s
    historical /= s
    nature /=s
    sport /= s
    
    X = np.append(X, [[night_life, historical, nature, sport]], axis = 0)
    

# Clustering 

kmeans = KMeans(n_clusters = 50, random_state = 0).fit(X)

labels = kmeans.labels_
#print("Prediction for first person", labels[0])

centroids = kmeans.cluster_centers_

# Prediction

predict = kmeans.predict([[0.5, 0.0, 0.5, 0.0]])
#print("Prediction for new person", predict)


new_person_centroids = centroids[predict[0]]
print(new_person_centroids)

new_person_attractions = []
overall_attractions = []

users_activity_num = 10

# Mnozenje rating sa procentom interesovanja

for i in range(len(night_life_attractions)):
    overall_attractions.append([night_life_attractions[i]['Rating'] * new_person_centroids[0], night_life_attractions[i]['Name']])
for i in range(len(night_life_attractions)):
    overall_attractions.append([historical_attractions[i]['Rating'] * new_person_centroids[1], historical_attractions[i]['Name']])
for i in range(len(night_life_attractions)):
    overall_attractions.append([sport_attractions[i]['Rating'] * new_person_centroids[2], sport_attractions[i]['Name']])
for i in range(len(night_life_attractions)):
    overall_attractions.append([nature_attractions[i]['Rating'] * new_person_centroids[3], nature_attractions[i]['Name']])
    
# Sort attractions
    overall_attractions.sort(reverse = True)
    
# Add best attractions
for i in range(users_activity_num):
    new_person_attractions.append(overall_attractions[i])

#print(overall_attractions)


print(new_person_attractions)


