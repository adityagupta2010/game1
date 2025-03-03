import random

def roll_dice():
    return random.randint(1, 6)

# Define snakes and ladders
snakes = {16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78}
ladders = {1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100}

def move_player(player, position):
    dice_value = roll_dice()
    print(f"{player} rolled a {dice_value}")
    new_position = position + dice_value
    
    if new_position in snakes:
        print(f"Oops! {player} got bitten by a snake at {new_position}")
        new_position = snakes[new_position]
    elif new_position in ladders:
        print(f"Yay! {player} climbed a ladder to {ladders[new_position]}")
        new_position = ladders[new_position]
    
    return new_position if new_position <= 100 else position

def play_game():
    players = int(input("Enter number of players: "))
    player_names = [input(f"Enter name for Player {i+1}: ") for i in range(players)]
    positions = {player: 0 for player in player_names}
    
    while True:
        for player in player_names:
            input(f"{player}, press Enter to roll the dice...")
            positions[player] = move_player(player, positions[player])
            print(f"{player} is now at position {positions[player]}\n")
            
            if positions[player] == 100:
                print(f"Congratulations {player}! You won the game!")
                return

if __name__ == "__main__":
    play_game()
