import librosa
import numpy as np

def compare_pronunciation(file1, file2):
    audio1, sr = librosa.load(file1)
    audio2, _ = librosa.load(file2, sr=sr)
    mfcc1 = librosa.feature.mfcc(y=audio1, sr=sr)
    mfcc2 = librosa.feature.mfcc(y=audio2, sr=sr)
    D, wp = librosa.sequence.dtw(X=mfcc1, Y=mfcc2)
    cost = np.sum(D[wp[:,0], wp[:,1]])
    # return cost
    # Compute DTW

    # Normalize the dtw cost by the path length
    normalized_cost = D[wp[-1][0], wp[-1][1]] / len(wp)

    return normalized_cost

file_path1 = 'Hello-Xin-chào.mp3'
# file_path2 = 'adrian-saying-hello.mp3'
file_path2 = 'Hello-Xin-chào.mp3'

distance = compare_pronunciation(file_path1, file_path2)
print("DTW distance:", distance)
