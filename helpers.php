<?php

use Carbon\Carbon;

function formatDate($date)
{
    return Carbon::createFromFormat('Y-m-d', $date)->format('F j, Y');
}
