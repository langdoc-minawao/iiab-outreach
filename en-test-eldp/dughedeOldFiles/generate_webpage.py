#this is the script that converts the .opex file in to


#!/usr/bin/env python3
import xml.etree.ElementTree as ET
from pathlib import Path
import html

metadata_dir = Path("metadata")
audio_base = "../audio"
output_file = Path("web/index.html")

html_parts = [
    "<!DOCTYPE html>",
    "<html lang='en'>",
    "<head><meta charset='utf-8'/>",
    "<meta name='viewport' content='width=device-width, initial-scale=1'/>",
    "<title>Dghwede Oral Archive</title>",
    "<link rel='stylesheet' href='style.css'/>",
    "<script defer src='script.js'></script>",
    "</head><body>",
    "<header>",
    "  <h1>Dghwede Oral Archive</h1>",
    "  <div class='controls'>",
    "    <input id='searchBox' type='text' placeholder='🔍 Search title, speaker, or keyword...'>",
    "    <button id='themeToggle' title='Toggle dark mode'>🌙</button>",
    "  </div>",
    "</header>",
]

ns = {
    'opex': 'http://www.openpreservationexchange.org/opex/v1.2',
    'imdi': 'http://www.mpi.nl/IMDI/Schema/IMDI'
}

for opex_file in sorted(metadata_dir.glob("*.opex")):
    tree = ET.parse(opex_file)
    root = tree.getroot()

    session = root.find(".//imdi:Session", ns)
    if session is None:
        continue

    title = session.findtext("imdi:Title", default="", namespaces=ns)
    date = session.findtext("imdi:Date", default="", namespaces=ns)
    description = session.findtext("imdi:Description", default="", namespaces=ns)
    actors = [a.findtext("imdi:Name", default="", namespaces=ns)
              for a in session.findall(".//imdi:Actor", ns)]

    html_parts.append(f"<section class='session'>")
    html_parts.append(f"  <h2 class='session-title'>{html.escape(title)}</h2>")

    # Audio files always visible
    html_parts.append("  <div class='audio-files'>")
    for media in session.findall(".//imdi:MediaFile", ns):
        link = media.findtext("imdi:ResourceLink", default="", namespaces=ns)
        size = media.findtext("imdi:Size", default="", namespaces=ns)
        if link and link.endswith(".wav"):
            html_parts.append(f"    <div class='audio-item'>")
            html_parts.append(f"      <audio controls src='{audio_base}/{link}'></audio>")
            html_parts.append(f"      <p>{html.escape(link)} ({html.escape(size)})</p>")
            html_parts.append("    </div>")
    html_parts.append("  </div>")  # audio-files

    # Toggle icon below audio
    html_parts.append("  <div class='toggle-container'>")
    html_parts.append("    <span class='toggle-icon'>▼ Show description</span>")
    html_parts.append("  </div>")

    # Collapsible description
    html_parts.append("  <div class='session-details'>")
    html_parts.append(f"    <p><strong>Date:</strong> {html.escape(date)}</p>")
    html_parts.append(f"    <p><strong>Actors:</strong> {', '.join(html.escape(a) for a in actors)}</p>")
    html_parts.append(f"    <p>{html.escape(description)}</p>")
    html_parts.append("  </div>")  # session-details

    html_parts.append("</section>")

html_parts.append("</body></html>")

output_file.write_text("\n".join(html_parts), encoding="utf-8")
print("✅ Generated:", output_file.resolve())
