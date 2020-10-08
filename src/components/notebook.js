import './notebook.css';
import React from 'react';

const createMarkup = () => {
  return {__html: `<div>
<div tabindex="-1" id="notebook" class="border-box-sizing">
  <div class="container" id="notebook-container">

  <div class="cell border-box-sizing code_cell rendered">
  <div class="input">
  <div class="prompt input_prompt">In&nbsp;[&nbsp;]:</div>
<div class="inner_cell">
  <div class="input_area">
  <div class=" highlight hl-ipython3"><pre><span></span><span class="n">pip</span> <span class="n">install</span> <span class="n">kafka</span><span class="o">-</span><span class="n">python</span>
</pre></div>

</div>
</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
  <div class="input">
  <div class="prompt input_prompt">In&nbsp;[2]:</div>
<div class="inner_cell">
  <div class="input_area">
  <div class=" highlight hl-ipython3"><pre><span></span><span class="kn">from</span> <span class="nn">kafka</span> <span class="kn">import</span> <span class="n">KafkaConsumer</span><span class="p">,</span> <span class="n">TopicPartition</span>
  <span class="kn">from</span> <span class="nn">datetime</span> <span class="kn">import</span> <span class="n">datetime</span>
<span class="kn">import</span> <span class="nn">os</span>
<span class="kn">import</span> <span class="nn">sys</span>

<span class="c1">#settings                       </span>
  <span class="n">client</span> <span class="o">=</span> <span class="p">[</span><span class="s2">&quot;db-events-kafka-bootstrap:9092&quot;</span><span class="p">]</span>
<span class="n">topic</span> <span class="o">=</span> <span class="s1">&#39;spring-trades&#39;</span>
<span class="n">nbrrecords</span> <span class="o">=</span> <span class="nb">int</span><span class="p">(</span><span class="mi">50</span><span class="p">)</span>
<span class="n">nbrrecordsretreived</span> <span class="o">=</span> <span class="nb">int</span><span class="p">(</span><span class="mi">0</span><span class="p">)</span>
<span class="n">now</span> <span class="o">=</span> <span class="n">datetime</span><span class="o">.</span><span class="n">now</span><span class="p">()</span><span class="o">.</span><span class="n">strftime</span><span class="p">(</span><span class="s2">&quot;</span><span class="si">%d</span><span class="s2">%m%Y-%H%M&quot;</span><span class="p">)</span>

<span class="k">try</span><span class="p">:</span>
<span class="c1"># prepare consumer</span>
<span class="n">tp</span> <span class="o">=</span> <span class="n">TopicPartition</span><span class="p">(</span><span class="n">topic</span><span class="p">,</span><span class="mi">0</span><span class="p">)</span>
<span class="n">consumer</span> <span class="o">=</span> <span class="n">KafkaConsumer</span><span class="p">(</span><span class="n">bootstrap_servers</span><span class="o">=</span><span class="n">client</span><span class="p">)</span>
<span class="n">consumer</span><span class="o">.</span><span class="n">assign</span><span class="p">([</span><span class="n">tp</span><span class="p">])</span>
<span class="n">consumer</span><span class="o">.</span><span class="n">seek_to_beginning</span><span class="p">(</span><span class="n">tp</span><span class="p">)</span>
<span class="c1"># obtain the last offset value</span>
<span class="n">lastOffset</span> <span class="o">=</span> <span class="n">consumer</span><span class="o">.</span><span class="n">end_offsets</span><span class="p">([</span><span class="n">tp</span><span class="p">])[</span><span class="n">tp</span><span class="p">]</span>
<span class="c1"># consume the messages</span>
<span class="k">for</span> <span class="n">message</span> <span class="ow">in</span> <span class="n">consumer</span><span class="p">:</span>
<span class="nb">print</span><span class="p">(</span><span class="n">message</span><span class="p">)</span>
<span class="n">nbrrecordsretreived</span> <span class="o">+=</span> <span class="mi">1</span>
  <span class="k">if</span> <span class="n">message</span><span class="o">.</span><span class="n">offset</span> <span class="o">==</span> <span class="n">lastOffset</span> <span class="o">-</span> <span class="mi">1</span><span class="p">:</span>
<span class="k">break</span>
<span class="k">with</span> <span class="nb">open</span><span class="p">(</span><span class="s1">&#39;testing-results-&#39;</span><span class="o">+</span><span class="n">now</span><span class="o">+</span><span class="s1">&#39;.txt&#39;</span><span class="p">,</span> <span class="s1">&#39;w&#39;</span><span class="p">)</span> <span class="k">as</span> <span class="n">f</span><span class="p">:</span>
<span class="n">f</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="s2">&quot;Consume process completed Successfully </span><span class="se">\\n</span><span class="s2">&quot;</span><span class="p">)</span>
<span class="n">f</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="s2">&quot;Records Retrieved: &quot;</span> <span class="o">+</span> <span class="nb">str</span><span class="p">(</span><span class="n">nbrrecordsretreived</span><span class="p">)</span> <span class="o">+</span><span class="s2">&quot;</span><span class="se">\\n</span><span class="s2">&quot;</span><span class="p">)</span>
<span class="k">except</span><span class="p">:</span>
<span class="k">with</span> <span class="nb">open</span><span class="p">(</span><span class="s1">&#39;testing-results-&#39;</span><span class="o">+</span><span class="n">now</span><span class="o">+</span><span class="s1">&#39;.txt&#39;</span><span class="p">,</span> <span class="s1">&#39;w&#39;</span><span class="p">)</span> <span class="k">as</span> <span class="n">f</span><span class="p">:</span>
<span class="n">f</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="s2">&quot;ERROR during consume process !&quot;</span><span class="p">)</span>
<span class="n">f</span><span class="o">.</span><span class="n">write</span><span class="p">(</span><span class="s2">&quot;</span><span class="se">\\n</span><span class="s2">&quot;</span><span class="p">)</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
  <div class="output">


  <div class="output_area">

  <div class="prompt"></div>


  <div class="output_subarea output_stream output_stdout output_text">
  <pre>ConsumerRecord(topic=&#39;spring-trades&#39;, partition=0, offset=0, timestamp=1602009621692, timestamp_type=0, key=b&#39;{&#34;schema&#34;:{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;databaseName&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.SchemaChangeKey&#34;},&#34;payload&#34;:{&#34;databaseName&#34;:&#34;&#34;}}&#39;, value=b&#39;{&#34;schema&#34;:{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;version&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;connector&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;name&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;ts_ms&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;name&#34;:&#34;io.debezium.data.Enum&#34;,&#34;version&#34;:1,&#34;parameters&#34;:{&#34;allowed&#34;:&#34;true,last,false&#34;},&#34;default&#34;:&#34;false&#34;,&#34;field&#34;:&#34;snapshot&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;db&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;table&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;server_id&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;gtid&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;file&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;pos&#34;},{&#34;type&#34;:&#34;int32&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;row&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;thread&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;query&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.Source&#34;,&#34;field&#34;:&#34;source&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;databaseName&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;ddl&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.SchemaChangeValue&#34;},&#34;payload&#34;:{&#34;source&#34;:{&#34;version&#34;:&#34;1.1.0.Final&#34;,&#34;connector&#34;:&#34;mysql&#34;,&#34;name&#34;:&#34;spring-trades&#34;,&#34;ts_ms&#34;:0,&#34;snapshot&#34;:&#34;true&#34;,&#34;db&#34;:&#34;&#34;,&#34;table&#34;:null,&#34;server_id&#34;:0,&#34;gtid&#34;:null,&#34;file&#34;:&#34;ON.000002&#34;,&#34;pos&#34;:491859,&#34;row&#34;:0,&#34;thread&#34;:null,&#34;query&#34;:null},&#34;databaseName&#34;:&#34;&#34;,&#34;ddl&#34;:&#34;SET character_set_server=utf8mb4, collation_server=utf8mb4_0900_ai_ci;SET character_set_server=utf8mb4, collation_server=utf8mb4_0900_ai_ci;&#34;}}&#39;, headers=[], checksum=None, serialized_key_size=197, serialized_value_size=1536, serialized_header_size=-1)
ConsumerRecord(topic=&#39;spring-trades&#39;, partition=0, offset=1, timestamp=1602009623035, timestamp_type=0, key=b&#39;{&#34;schema&#34;:{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;databaseName&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.SchemaChangeKey&#34;},&#34;payload&#34;:{&#34;databaseName&#34;:&#34;trades&#34;}}&#39;, value=b&#39;{&#34;schema&#34;:{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;version&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;connector&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;name&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;ts_ms&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;name&#34;:&#34;io.debezium.data.Enum&#34;,&#34;version&#34;:1,&#34;parameters&#34;:{&#34;allowed&#34;:&#34;true,last,false&#34;},&#34;default&#34;:&#34;false&#34;,&#34;field&#34;:&#34;snapshot&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;db&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;table&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;server_id&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;gtid&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;file&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;pos&#34;},{&#34;type&#34;:&#34;int32&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;row&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;thread&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;query&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.Source&#34;,&#34;field&#34;:&#34;source&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;databaseName&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;ddl&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.SchemaChangeValue&#34;},&#34;payload&#34;:{&#34;source&#34;:{&#34;version&#34;:&#34;1.1.0.Final&#34;,&#34;connector&#34;:&#34;mysql&#34;,&#34;name&#34;:&#34;spring-trades&#34;,&#34;ts_ms&#34;:0,&#34;snapshot&#34;:&#34;true&#34;,&#34;db&#34;:&#34;trades&#34;,&#34;table&#34;:&#34;trade&#34;,&#34;server_id&#34;:0,&#34;gtid&#34;:null,&#34;file&#34;:&#34;ON.000002&#34;,&#34;pos&#34;:491859,&#34;row&#34;:0,&#34;thread&#34;:null,&#34;query&#34;:null},&#34;databaseName&#34;:&#34;trades&#34;,&#34;ddl&#34;:&#34;DROP TABLE IF EXISTS \`trades\`.\`trade\`&#34;}}&#39;, headers=[], checksum=None, serialized_key_size=203, serialized_value_size=1448, serialized_header_size=-1)
ConsumerRecord(topic=&#39;spring-trades&#39;, partition=0, offset=2, timestamp=1602009625038, timestamp_type=0, key=b&#39;{&#34;schema&#34;:{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;databaseName&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.SchemaChangeKey&#34;},&#34;payload&#34;:{&#34;databaseName&#34;:&#34;trades&#34;}}&#39;, value=b&#39;{&#34;schema&#34;:{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;version&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;connector&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;name&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;ts_ms&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;name&#34;:&#34;io.debezium.data.Enum&#34;,&#34;version&#34;:1,&#34;parameters&#34;:{&#34;allowed&#34;:&#34;true,last,false&#34;},&#34;default&#34;:&#34;false&#34;,&#34;field&#34;:&#34;snapshot&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;db&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;table&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;server_id&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;gtid&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;file&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;pos&#34;},{&#34;type&#34;:&#34;int32&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;row&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;thread&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;query&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.Source&#34;,&#34;field&#34;:&#34;source&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;databaseName&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;ddl&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.SchemaChangeValue&#34;},&#34;payload&#34;:{&#34;source&#34;:{&#34;version&#34;:&#34;1.1.0.Final&#34;,&#34;connector&#34;:&#34;mysql&#34;,&#34;name&#34;:&#34;spring-trades&#34;,&#34;ts_ms&#34;:0,&#34;snapshot&#34;:&#34;true&#34;,&#34;db&#34;:&#34;trades&#34;,&#34;table&#34;:null,&#34;server_id&#34;:0,&#34;gtid&#34;:null,&#34;file&#34;:&#34;ON.000002&#34;,&#34;pos&#34;:491859,&#34;row&#34;:0,&#34;thread&#34;:null,&#34;query&#34;:null},&#34;databaseName&#34;:&#34;trades&#34;,&#34;ddl&#34;:&#34;DROP DATABASE IF EXISTS \`trades\`&#34;}}&#39;, headers=[], checksum=None, serialized_key_size=203, serialized_value_size=1440, serialized_header_size=-1)
ConsumerRecord(topic=&#39;spring-trades&#39;, partition=0, offset=3, timestamp=1602009625039, timestamp_type=0, key=b&#39;{&#34;schema&#34;:{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;databaseName&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.SchemaChangeKey&#34;},&#34;payload&#34;:{&#34;databaseName&#34;:&#34;trades&#34;}}&#39;, value=b&#39;{&#34;schema&#34;:{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;version&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;connector&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;name&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;ts_ms&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;name&#34;:&#34;io.debezium.data.Enum&#34;,&#34;version&#34;:1,&#34;parameters&#34;:{&#34;allowed&#34;:&#34;true,last,false&#34;},&#34;default&#34;:&#34;false&#34;,&#34;field&#34;:&#34;snapshot&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;db&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;table&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;server_id&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;gtid&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;file&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;pos&#34;},{&#34;type&#34;:&#34;int32&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;row&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;thread&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;query&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.Source&#34;,&#34;field&#34;:&#34;source&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;databaseName&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;ddl&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.SchemaChangeValue&#34;},&#34;payload&#34;:{&#34;source&#34;:{&#34;version&#34;:&#34;1.1.0.Final&#34;,&#34;connector&#34;:&#34;mysql&#34;,&#34;name&#34;:&#34;spring-trades&#34;,&#34;ts_ms&#34;:0,&#34;snapshot&#34;:&#34;true&#34;,&#34;db&#34;:&#34;trades&#34;,&#34;table&#34;:null,&#34;server_id&#34;:0,&#34;gtid&#34;:null,&#34;file&#34;:&#34;ON.000002&#34;,&#34;pos&#34;:491859,&#34;row&#34;:0,&#34;thread&#34;:null,&#34;query&#34;:null},&#34;databaseName&#34;:&#34;trades&#34;,&#34;ddl&#34;:&#34;CREATE DATABASE \`trades\`&#34;}}&#39;, headers=[], checksum=None, serialized_key_size=203, serialized_value_size=1432, serialized_header_size=-1)
ConsumerRecord(topic=&#39;spring-trades&#39;, partition=0, offset=4, timestamp=1602009625040, timestamp_type=0, key=b&#39;{&#34;schema&#34;:{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;databaseName&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.SchemaChangeKey&#34;},&#34;payload&#34;:{&#34;databaseName&#34;:&#34;trades&#34;}}&#39;, value=b&#39;{&#34;schema&#34;:{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;version&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;connector&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;name&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;ts_ms&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;name&#34;:&#34;io.debezium.data.Enum&#34;,&#34;version&#34;:1,&#34;parameters&#34;:{&#34;allowed&#34;:&#34;true,last,false&#34;},&#34;default&#34;:&#34;false&#34;,&#34;field&#34;:&#34;snapshot&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;db&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;table&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;server_id&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;gtid&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;file&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;pos&#34;},{&#34;type&#34;:&#34;int32&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;row&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;thread&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;query&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.Source&#34;,&#34;field&#34;:&#34;source&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;databaseName&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;ddl&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.SchemaChangeValue&#34;},&#34;payload&#34;:{&#34;source&#34;:{&#34;version&#34;:&#34;1.1.0.Final&#34;,&#34;connector&#34;:&#34;mysql&#34;,&#34;name&#34;:&#34;spring-trades&#34;,&#34;ts_ms&#34;:0,&#34;snapshot&#34;:&#34;true&#34;,&#34;db&#34;:&#34;trades&#34;,&#34;table&#34;:null,&#34;server_id&#34;:0,&#34;gtid&#34;:null,&#34;file&#34;:&#34;ON.000002&#34;,&#34;pos&#34;:491859,&#34;row&#34;:0,&#34;thread&#34;:null,&#34;query&#34;:null},&#34;databaseName&#34;:&#34;trades&#34;,&#34;ddl&#34;:&#34;USE \`trades\`&#34;}}&#39;, headers=[], checksum=None, serialized_key_size=203, serialized_value_size=1420, serialized_header_size=-1)
ConsumerRecord(topic=&#39;spring-trades&#39;, partition=0, offset=5, timestamp=1602009625537, timestamp_type=0, key=b&#39;{&#34;schema&#34;:{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;databaseName&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.SchemaChangeKey&#34;},&#34;payload&#34;:{&#34;databaseName&#34;:&#34;trades&#34;}}&#39;, value=b&#39;{&#34;schema&#34;:{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;struct&#34;,&#34;fields&#34;:[{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;version&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;connector&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;name&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;ts_ms&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;name&#34;:&#34;io.debezium.data.Enum&#34;,&#34;version&#34;:1,&#34;parameters&#34;:{&#34;allowed&#34;:&#34;true,last,false&#34;},&#34;default&#34;:&#34;false&#34;,&#34;field&#34;:&#34;snapshot&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;db&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;table&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;server_id&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;gtid&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;file&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;pos&#34;},{&#34;type&#34;:&#34;int32&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;row&#34;},{&#34;type&#34;:&#34;int64&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;thread&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:true,&#34;field&#34;:&#34;query&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.Source&#34;,&#34;field&#34;:&#34;source&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;databaseName&#34;},{&#34;type&#34;:&#34;string&#34;,&#34;optional&#34;:false,&#34;field&#34;:&#34;ddl&#34;}],&#34;optional&#34;:false,&#34;name&#34;:&#34;io.debezium.connector.mysql.SchemaChangeValue&#34;},&#34;payload&#34;:{&#34;source&#34;:{&#34;version&#34;:&#34;1.1.0.Final&#34;,&#34;connector&#34;:&#34;mysql&#34;,&#34;name&#34;:&#34;spring-trades&#34;,&#34;ts_ms&#34;:0,&#34;snapshot&#34;:&#34;true&#34;,&#34;db&#34;:&#34;trades&#34;,&#34;table&#34;:&#34;trade&#34;,&#34;server_id&#34;:0,&#34;gtid&#34;:null,&#34;file&#34;:&#34;ON.000002&#34;,&#34;pos&#34;:491859,&#34;row&#34;:0,&#34;thread&#34;:null,&#34;query&#34;:null},&#34;databaseName&#34;:&#34;trades&#34;,&#34;ddl&#34;:&#34;CREATE TABLE \`trade\` (\\\\n  \`id\` varchar(40) NOT NULL,\\\\n  \`num_shares\` varchar(255) DEFAULT NULL,\\\\n  \`price\` varchar(255) DEFAULT NULL,\\\\n  \`ticker\` varchar(255) DEFAULT NULL,\\\\n  \`time\` varchar(255) DEFAULT NULL,\\\\n  \`trade_id\` varchar(255) DEFAULT NULL,\\\\n  PRIMARY KEY (\`id\`)\\\\n) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci&#34;}}&#39;, headers=[], checksum=None, serialized_key_size=203, serialized_value_size=1751, serialized_header_size=-1)
</pre>
</div>
</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
  <div class="input">
  <div class="prompt input_prompt">In&nbsp;[1]:</div>
<div class="inner_cell">
  <div class="input_area">
  <div class=" highlight hl-ipython3"><pre><span></span><span class="kn">import</span> <span class="nn">kafka</span>
  <span class="n">client</span> <span class="o">=</span> <span class="p">[</span><span class="s2">&quot;db-events-kafka-bootstrap:9092&quot;</span><span class="p">]</span>

<span class="n">consumer</span> <span class="o">=</span> <span class="n">kafka</span><span class="o">.</span><span class="n">KafkaConsumer</span><span class="p">(</span><span class="n">group_id</span><span class="o">=</span><span class="s1">&#39;spring-trades-db&#39;</span><span class="p">,</span> <span class="n">bootstrap_servers</span><span class="o">=</span><span class="n">client</span><span class="p">)</span>
<span class="n">consumer</span><span class="o">.</span><span class="n">topics</span><span class="p">()</span>
</pre></div>

</div>
</div>
</div>

<div class="output_wrapper">
  <div class="output">


  <div class="output_area">

  <div class="prompt output_prompt">Out[1]:</div>




<div class="output_text output_subarea output_execute_result">
  <pre>{&#39;dbhistory.trades&#39;,
&#39;outbox.Trade.events&#39;,
&#39;spring-trades&#39;,
&#39;spring-trades-db-configs&#39;,
&#39;spring-trades-db-offsets&#39;,
&#39;spring-trades-db-status&#39;}</pre>
</div>

</div>

</div>
</div>

</div>
<div class="cell border-box-sizing code_cell rendered">
  <div class="input">
  <div class="prompt input_prompt">In&nbsp;[&nbsp;]:</div>
<div class="inner_cell">
  <div class="input_area">
  <div class=" highlight hl-ipython3"><pre><span></span>
  </pre></div>

</div>
</div>
</div>

</div>
</div>
</div>
</div>`};
}

export default () => (
  <div className="app-c-notebook" dangerouslySetInnerHTML={createMarkup()} />
);

