"""
graph benchmark results included in readme using a horizontal bar chart

adapted from https://matplotlib.org/3.3.3/gallery/lines_bars_and_markers/barh.html
"""
import matplotlib.pyplot as plt
import numpy as np

plt.rcdefaults()
plt.style.use("dark_background")
fig, ax = plt.subplots()

# I would like to use "transparent=True" and avoid these color settings when
# saving the figure, but currently there's no way to load different images in
# GitHub readme depending on whether the user set the light or the dark mode
fig.set_facecolor("#0d1117")
ax.set_facecolor("#0d1117")

# data
packages = ("wordwrap", "wrap-text", "word-wrap", "fast-word-wrap")
y_pos = np.arange(len(packages))
times = (1501, 533, 507, 47)

# plot
ax.barh(y_pos, times, color=["tab:red", "tab:green", "tab:orange", "tab:blue"])
ax.set_yticks(y_pos)
ax.set_yticklabels(packages)
ax.invert_yaxis()  # labels read top-to-bottom
ax.set_xlim([0, 2000])
ax.set_xlabel("time (ms)")
ax.set_title("benchmark\n11th Gen Intel\u00ae Core\u2122 i7-1165G7 @ 2.80GHz", pad=15)
ax.grid(axis="x", dashes=(5, 5), alpha=0.1)
ax.set_axisbelow(True)

# print values near bars
for i, val in enumerate(times):
    ax.text(val + 200, i, str(val), ha="center", va="center")

# store
plt.savefig("barh.png", bbox_inches = "tight", facecolor=fig.get_facecolor())
