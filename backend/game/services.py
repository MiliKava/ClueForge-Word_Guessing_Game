def mask_phrase(phrase, guessed):
    result = []

    for ch in phrase:
        if ch == " ":
            result.append(" ")
        elif ch in guessed or not ch.isalnum():
            result.append(ch)
        else:
            result.append("_")

    return " ".join(result)