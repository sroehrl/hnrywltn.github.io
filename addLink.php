<?php
$existing = [];
$input = json_decode(file_get_contents("php://input"), true);
if(!empty($input)){
    $existing = json_decode(file_get_contents(__DIR__. '/data.json'),true);
    $existing['topics'][$input['topic']]['links'][] = ['title' => $input['title'], 'url' => $input['url']];
    file_put_contents(__DIR__. '/data.json', json_encode($existing));

}
header('Content-Type: application/json');
echo json_encode(['request'=>'sent', 'data'=> $existing]);